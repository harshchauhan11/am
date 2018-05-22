import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMap, GoogleMapsEvent } from "@ionic-native/google-maps";
import {} from "@types/google-maps";
import { MapsProvider } from "../../providers/maps/maps";

declare var google;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  location: {
    latitude: number;
    longitude: number;
  };
  @ViewChild('map') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public geolocation: Geolocation,
    public mapsProvider: MapsProvider
  ) {
    platform.ready().then(() => {
      this.findUserLocation();
    });
  }

  // loadMap() {

  //   this.geolocation.watchPosition().subscribe((position) => {
  //     this.x = position.coords.longitude;
  //     this.y = position.coords.latitude;

  //     let latLng = new google.maps.LatLng(this.x, this.y);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //   }, (err) => {
  //     console.log(err);
  //   });
  //   // this.geolocation
  //   //   .getCurrentPosition()
  //   //   .then(resp => {
  //   //     console.log(resp.coords.latitude);
  //   //     console.log(resp.coords.longitude);
  //   //     // resp.coords.latitude
  //   //     // resp.coords.longitude
  //   //   })
  //   //   .catch(error => {
  //   //     console.log("Error getting location", error);
  //   //   });

  //   // let watch = this.geolocation.watchPosition();
  //   // watch.subscribe(data => {
  //   //   // data can be a set of coordinates, or an error (if an error occurred).
  //   //   // data.coords.latitude
  //   //   // data.coords.longitude
  //   // });
  // }
  findUserLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    this.geolocation
      .getCurrentPosition(options)
      .then(position => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.mapsProvider.init(this.location, this.mapElement);
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
