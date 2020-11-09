import {Component, OnInit} from '@angular/core';

// import {} from 'googlemaps';
// @ts-ignore
import {} from 'googlemaps'
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
export class RouteFinderComponent implements OnInit {

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

  constructor() {
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
        scrollwheel: false,
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
    (document.getElementById('start') as HTMLElement).addEventListener(
      'change',
      onChangeHandler
    );
    (document.getElementById('end') as HTMLElement).addEventListener(
      'change',
      onChangeHandler
    );
  }

  calculateAndDisplayRoute(directionsService: DirectionsService, directionsRenderer: DirectionsRenderer): void {
    directionsService.route(
      {
        origin: {
          query: (document.getElementById('start') as HTMLInputElement).value,
        },
        destination: {
          query: (document.getElementById('end') as HTMLInputElement).value,
        },
        travelMode: TravelMode.BICYCLING,
      },
      (response, status) => {

        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  computeTotalDistance(result: DirectionsResult): void {

    let total = 0;
    const myroute = result.routes[0];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    console.log(total);

  }

}

