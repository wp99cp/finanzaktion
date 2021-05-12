import {Component, OnInit} from '@angular/core';
import * as gpxParser from 'gpxparser';


@Component({
  selector: 'app-upload-tracking-file',
  templateUrl: './upload-tracking-file.component.html',
  styleUrls: ['./upload-tracking-file.component.sass']
})
export class UploadTrackingFileComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {


  }

  parseGPX() {


    const selectedFile = (document.getElementById('file-picker') as HTMLInputElement).files[0];

    const fr = new FileReader();

    fr.readAsText(selectedFile);

    fr.onload = () => {

      const gpx = new gpxParser();
      gpx.parse(fr.result);

      const totalDistance = gpx.tracks[0].distance.total;
      console.log(totalDistance / 1_000, 'km');

    };
  }

}
