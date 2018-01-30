import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { PlaceObserverService } from './services/place-observer.service';


import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MapComponent } from './components/map/map.component';
import { TestingComponent } from './components/testing/testing.component';
import { FirebaseComponent } from './components/firebase/firebase.component';
import { FbAnonymousAuthComponent } from './components/firebase/fb-anonymous-auth/fb-anonymous-auth.component';
import { FbNewUserComponent } from './components/firebase/fb-new-user/fb-new-user.component';
import { FbDatabaseRetrieveObjectComponent } from './components/firebase/fb-database-retrieve-object/fb-database.component';
import { FbDatabaseRetrieveListComponent } from './components/firebase/fb-database-retrieve-list/fb-database-retrieve-list.component';
import { FirebaseDatabaseQueryListComponent } from './components/firebase/firebase-database-query-list/firebase-database-query-list.component';




const appRoutes: Routes = [
  {path:'', component: SearchPageComponent },
  {path:'map', component: MapComponent },
  {path:'countryMap/:id', component: MapComponent },
  {path:'firebase', component: FirebaseComponent },
  {path:'firebase_anonym', component: FbAnonymousAuthComponent },
  {path:'firebase_new', component: FbNewUserComponent },
  {path:'firebase_database_objects', component: FbDatabaseRetrieveObjectComponent },
  {path:'firebase_database_lists', component: FbDatabaseRetrieveListComponent },
  {path:'firebase_database_lists_querying', component: FirebaseDatabaseQueryListComponent },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBMJCUwhwWKOqtqP_3KtCOsPUjGDbqVE0k",
    authDomain: "travelethical-b49d7.firebaseapp.com",
    databaseURL: "https://travelethical-b49d7.firebaseio.com",
    projectId: "travelethical-b49d7",
    storageBucket: "travelethical-b49d7.appspot.com",
    messagingSenderId: "737538781215"
};

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    MapComponent,
    TestingComponent,
    FirebaseComponent,
    FbAnonymousAuthComponent,
    FbNewUserComponent,
    FbDatabaseRetrieveObjectComponent,
    FbDatabaseRetrieveListComponent,
    FirebaseDatabaseQueryListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB20PLm-MLE5u_prqXZYhFLB515Yxq77Fk',
      libraries: ["places"]
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [PlaceObserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
