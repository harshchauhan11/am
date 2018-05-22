import { Injectable } from "@angular/core";
import {} from '@types/google-maps';

declare var google;

@Injectable()
export class JsMapsProvider {
  map: any;

  constructor() {
    console.log("Hello JsMapsProvider Provider");
  }

  init(location, element) {
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
  }
}
