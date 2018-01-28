import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ElementRef } from '@angular/core';

import { PlaceObserverService } from './place-observer.service';

@Injectable()
export class GoogleMapService {

  constructor(
  	private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private placeObserverService: PlaceObserverService
  ) { }

  loadAutocomplete(autocomplete) {
  	console.log("Autocomplete fired");
  	this.mapsAPILoader.load().then(() => {
      
      autocomplete.addListener("place_changed", () => {
      	console.log("Listener added");
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.placeObserverService.chosenPlace.next({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address
          });
        });
      });
    });
  }
}
