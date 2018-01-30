import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {
	email;
	emailVerified;
	photoURL;
	isAnonymous;
	uid;
	providerData;
	user;
	displayName;


	
	constructor(public afAuth: AngularFireAuth) {
	}

	login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  	firebase.auth().onAuthStateChanged(function(user) {
  		console.log("ONiNIT onAuthStateChanged WORKS!");
		  if (user) {
		    // User is signed in.
		    this.user = user;
		    this.email = user.email;
		    this.emailVerified = user.emailVerified;
		    this.photoURL = user.photoURL;
		    this.isAnonymous = user.isAnonymous;
		    this.uid = user.uid;
		    this.providerData = user.providerData;
		    // ...
		  } else {
		    // User is signed out.
		    // ...
		  }
		  console.log("ngOnInit CHANGED DATA: ", this.user, this.email, this.emailVerified, this.photoURL, this.isAnonymous, this.uid, this.providerData);
		  console.log("Static DATA: ", firebase);
		});

  }

  signInNewUser(email, password) {
  	console.log("---> signInNewUser args _ email, password: ", email, password);
  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.error("User can't be sign in. ", errorMessage )
		});
  }  

  signInAnonym() {
  	firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
  }


}
