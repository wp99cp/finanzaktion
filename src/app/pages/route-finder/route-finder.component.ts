import {Component, OnDestroy, OnInit} from '@angular/core';


// import {} from 'googlemaps';
// @ts-ignore
import {} from 'googlemaps';

import {DatabaseServiceService} from '../../services/database-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialogComponent} from '../../dialoges/simple-dialog/simple-dialog.component';
import MapTypeStyle = google.maps.MapTypeStyle;
import DirectionsResult = google.maps.DirectionsResult;
import TravelMode = google.maps.TravelMode;
import DirectionsService = google.maps.DirectionsService;
import DirectionsRenderer = google.maps.DirectionsRenderer;

@Component({
  selector: 'app-route-finder',
  templateUrl: './route-finder.component.html',
  styleUrls: ['./route-finder.component.sass']
})
export class RouteFinderComponent implements OnInit, OnDestroy {


  public partId: any;
  public group = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
    date: new FormControl(''),
    notes: new FormControl(''),
  });
  public routeBerechnet = false;
  public totalDistance = 0;
  private styleArray: MapTypeStyle[] = [{
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  },
    {
      featureType: 'all',
      stylers: [{
        saturation: -80
      }]
    }, {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{
        lightness: 100
      },
        {
          visibility: 'simplified'
        }
      ]
    }
  ];
  private routeSubst: Subscription;

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

  ngOnInit(): void {

    this.initMap();

  }

  calculate(): void {

    console.log('Calc Route');

  }

  initMap(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
    });
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 14,
        center: {lat: 47.4176056, lng: 8.5192438},
        styles: this.styleArray,
        disableDefaultUI: true,
        fullscreenControl: true,   // all other controls works fine
        zoomControl: true,
      }
    );
    directionsRenderer.setMap(map);

    directionsRenderer.addListener('directions_changed', () => {
      this.computeTotalDistance(directionsRenderer.getDirections());
    });


    const onChangeHandler = () => {
      this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    (document.getElementById('search') as HTMLElement).addEventListener(
      'click',
      onChangeHandler
    );

  }

  calculateAndDisplayRoute(directionsService: DirectionsService, directionsRenderer: DirectionsRenderer): void {


    const originQuery = (document.getElementById('start') as HTMLInputElement).value;
    const destinationQuery = (document.getElementById('end') as HTMLInputElement).value

    if (originQuery === '' || destinationQuery === '') {
      this.openDialog('Gib eine gültige Adresse ein!');
      return;
    }

    directionsService.route(
      {
        origin: {
          query: originQuery,
        },
        destination: {
          query: destinationQuery,
        },
        travelMode: TravelMode.WALKING,
      },
      (response, status) => {

        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          this.routeBerechnet = true;
        } else {
          console.log('Error');
          this.openDialog('Google Maps konnte keine Route berechnen! Bitte prüfe deine Adressen, sind diese Vollständig (Strasse, Hausnummer, Ort)?');
          return;
        }
      }
    );
  }


  computeTotalDistance(result: DirectionsResult): void {

    this.totalDistance = 0;
    const myroute = result.routes[0];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < myroute.legs.length; i++) {
      this.totalDistance += myroute.legs[i].distance.value;
    }
    this.totalDistance = this.totalDistance / 1000;
    console.log(this.totalDistance);

  }

  saveRoute(): void {

    if (this.totalDistance === 0) {
      return;
    }

    console.log('Save to my account: ' + this.totalDistance);

    const data = {
      route_of: this.partId,
      length: this.totalDistance,
      origin: (document.getElementById('start') as HTMLInputElement).value,
      destination: (document.getElementById('end') as HTMLInputElement).value,
      date: (document.getElementById('date') as HTMLInputElement).value,
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

