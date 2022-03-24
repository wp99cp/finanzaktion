import {Component, OnDestroy} from '@angular/core';
import * as gpxParser from 'gpxparser';
import {FormControl, FormGroup} from '@angular/forms';
import {DatabaseServiceService} from '../../services/database-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {SimpleDialogComponent} from '../../dialoges/simple-dialog/simple-dialog.component';


@Component({
  selector: 'app-upload-tracking-file',
  templateUrl: './upload-tracking-file.component.html',
  styleUrls: ['./upload-tracking-file.component.sass']
})
export class UploadTrackingFileComponent implements OnDestroy {

  public routeLength = 0;
  public group = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
    date: new FormControl(''),
    notes: new FormControl(''),
  });
  private partId;
  private readonly routeSubst: Subscription;
  private elevation = {};


  constructor(private dbService: DatabaseServiceService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {

    this.routeSubst = this.route.params.subscribe(params => {
      this.partId = params.partId;
    });

  }


  ngOnDestroy(): void {

    if (this.routeSubst) {
      this.routeSubst.unsubscribe();
    }

  }

  parseGPX() {


    const selectedFile = (document.getElementById('file-picker') as HTMLInputElement).files[0];

    const fr = new FileReader();

    fr.readAsText(selectedFile);

    fr.onload = async () => {

      // @ts-ignore
      const gpx = new gpxParser();
      gpx.parse(fr.result);

      const totalDistance = gpx.tracks[0].distance.total;
      this.routeLength = Number.parseFloat((totalDistance / 1_000).toFixed(2));
      this.elevation = gpx.tracks[0].elevation;

      const startCood = await this.transformCoord([gpx.tracks[0].points[0].lon, gpx.tracks[0].points[0].lat]);
      const lastPointIndex = gpx.tracks[0].points.length - 1;
      const endCood = await this.transformCoord([gpx.tracks[0].points[lastPointIndex].lon, gpx.tracks[0].points[lastPointIndex].lat]);


      this.group.setValue({
        start: await this.queryFlurNames(startCood),
        end: await this.queryFlurNames(endCood),
        date: new Date(gpx.tracks[0].points[0].time).toISOString().substr(0, 10),
        notes: ''
      });

    };
  }

  transformCoord(worldCood: [number, number]): Promise<[number, number]> {

    return fetch('https://geodesy.geo.admin.ch/reframe/navref?format=json&easting=' + worldCood[0] +
      '&northing=' + worldCood[1] + '&altitude=NaN&input=etrf93-ed&output=lv03', {
      method: 'GET',
      redirect: 'follow'
    }).then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => [Number.parseFloat(response.easting), Number.parseFloat(response.northing)]);

  }

  saveRoute(): void {

    if (this.routeLength === 0) {
      return;
    }

    console.log('Save to my account: ' + this.routeLength);

    const data = {
      route_of: this.partId,
      length: this.routeLength,
      origin: (document.getElementById('start') as HTMLInputElement).value,
      destination: (document.getElementById('end') as HTMLInputElement).value,
      date: (document.getElementById('date') as HTMLInputElement).value,
      elevation: this.elevation
    };

    this.dbService.createDocument('routes', data)
      .then(r => {
        console.log(r);
        this.router.navigate(['/app/' + this.partId + '/routen']);
      })
      .catch(err => {
        this.openDialog('Routen können erst ab dem 19. Juni erfasst werden!');
      });


  }

  private parseFlurNames(queryResponse: any): string | undefined {

    console.log(queryResponse)

    const adressen = queryResponse?.results.filter(el => el?.layerBodId === 'ch.swisstopo.amtliches-gebaeudeadressverzeichnis');
    if (adressen.length > 0) {
      return adressen[0].attributes.str_label + ' ' + adressen[0].attributes.adr_number + ', ' +
        adressen[0].attributes.adr_zip + ' ' + adressen[0].attributes.com_name;
    }


    const stationen = queryResponse?.results.filter(el => el?.layerBodId === 'ch.bav.haltestellen-oev');
    if (stationen.length > 0) {
      return stationen[0]?.attributes?.name;
    }


    const flurnames = queryResponse?.results.filter(el =>
      [
        'Haupthuegel', 'Huegel', 'Pass', 'Strassenpass', 'Alpiner Gipfel', 'Gipfel', 'Graben', 'Gletscher', 'Kapelle', 'Turm',
        'Schwimmbadareal', 'Campingplatzareal', 'Golfplatzareal', 'Zooareal', 'Freizeitanlagenareal', 'Abwasserreinigungsareal', 'Friedhof',
        'Spitalareal', 'Quartierteil', 'Ort', 'See', 'Bach', 'Haltestelle Bus', 'Haltestelle Schiff', 'Uebrige Bahnen',
        'Haltestelle Bahn', 'Gebaeude', 'Offenes Gebaeude', 'Schul- und Hochschulareal', 'Lokalname swisstopo', 'Flurname swisstopo', 'Tal', 'Grat'
      ].includes(el?.attributes?.objektart) && !['TLM_SIEDLUNGSNAME'].includes(el?.attributes?.objektklasse)
    );
    if (flurnames.length > 0) {
      return flurnames[0].attributes.name;
    }


    return undefined;

  }

  private async queryFlurNames(coord: [number, number], tolerance = 50) {

    if (tolerance >= 250) {
      throw new Error('Tolerance to big!');
    }

    const url = new URL('https://api3.geo.admin.ch/rest/services/api/MapServer/identify');
    url.searchParams.append('imageDisplay', '100,100,100');
    url.searchParams.append('tolerance', tolerance.toString());
    url.searchParams.append('geometryType', 'esriGeometryPoint');
    url.searchParams.append('geometry', this.coordToString(coord));
    url.searchParams.append('returnGeometry', 'false');
    url.searchParams.append('layers', 'all:ch.swisstopo.swissnames3d,ch.swisstopo.amtliches-gebaeudeadressverzeichnis,ch.bav.haltestellen-oev');
    url.searchParams.append('mapExtent', this.coordToString(coord.map(x => x + 50)) + ',' + this.coordToString(coord.map(x => x - 50)));


    let queryResponse = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow'
    }).then(response => response.text());
    queryResponse = JSON.parse(queryResponse);

    const flurname = this.parseFlurNames(queryResponse);

    if (flurname === undefined) {
      return await this.queryFlurNames(coord, tolerance + 25);
    }

    return flurname;

  }

  private coordToString(coord: number[]) {
    return coord.toString().replace(/\s/g, '');
  }

  private openDialog(message: string) {

    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '500px',
      data: {message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


  }

}
