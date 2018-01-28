import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PlaceObserverService {

  constructor() { }

  chosenPlace = new BehaviorSubject({
  	lat: 20,
  	lng: 20,
  	formatted_address: 'Warszawa, Poland'
  });
  //chosenPlace = new Subject();

  /*{
  	lat: 76.231343354,
  	lng: 20.4384303213,
  	formatted_address: 'Warszawa, Poland'
  }*/



}
