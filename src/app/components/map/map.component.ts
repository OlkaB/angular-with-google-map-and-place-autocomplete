import { Component, ElementRef, NgZone, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { PlaceObserverService } from '../../services/place-observer.service';
import { GoogleMapService } from '../../services/google-map.service';

import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapService]
})
export class MapComponent implements OnInit, OnDestroy {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public formatted_address: string;
  public searchControl: FormControl;

  subscription: Subscription;

  @ViewChild("searchMe")
  public searchMeElementRef: ElementRef;

  constructor(
  	private placeObserverService: PlaceObserverService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googleMapService: GoogleMapService
  ) { }

  ngOnInit() {
  	this.subscription = this.placeObserverService.chosenPlace.subscribe((data) => {
      console.log("Map subscribed data: ", data);
  		this.latitude = data['lat'];
      this.longitude = data['lng'];
  	});
    console.log("Map long & lat: ", this.latitude, this.longitude);
    this.setCurrentPosition(this.latitude, this.longitude);
    
    //create search FormControl
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchMeElementRef.nativeElement, {
        types: ["address"]
      });
      this.googleMapService.loadAutocomplete(autocomplete);
    }); 
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

  setCurrentPosition(lat, long) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = lat;
        this.longitude = long;
        this.zoom = 5;
      });
    }
  }
 
}
