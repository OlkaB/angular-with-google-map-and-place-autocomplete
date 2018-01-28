import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Router } from '@angular/router';
import { PlaceObserverService } from '../../services/place-observer.service';
import { GoogleMapService } from '../../services/google-map.service';

import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  providers: [GoogleMapService]
})
export class SearchPageComponent implements OnInit, OnDestroy {
	public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public place;

  subscription: Subscription;



  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googleMapService: GoogleMapService,
    private router: Router,
    private placeObserverService: PlaceObserverService
  ) {}

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      this.googleMapService.loadAutocomplete(autocomplete);
    });
    this.subscription = this.placeObserverService.chosenPlace.subscribe((data) => {
      console.log("search data: ", data)
      this.place = data['formatted_address'] || 'all';
      console.log("place chosen: ", this.place)
    });
  }

  submitPlace(search) {
    this.router.navigate(['/map']);
  }

  ngOnDestroy() {
    console.log("Search Component destroyed");
    this.subscription.unsubscribe();
  }
}
