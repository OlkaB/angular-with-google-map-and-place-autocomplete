import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { PlaceObserverService } from './services/place-observer.service';


import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MapComponent } from './components/map/map.component';
import { TestingComponent } from './components/testing/testing.component';

const appRoutes: Routes = [
  {path:'', component: SearchPageComponent },
  {path:'map', component: MapComponent },
  {path:'countryMap/:id', component: MapComponent },
  {path:'test', component: TestingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    MapComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB20PLm-MLE5u_prqXZYhFLB515Yxq77Fk',
      libraries: ["places"]
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlaceObserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
