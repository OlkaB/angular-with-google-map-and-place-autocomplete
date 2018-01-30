/*
– We subscribe to the AngularFire auth observable that returns a FirebaseAuthState object. This object is null when logging out, and contains useful User Information (UID, Display Name, Photo URL…) when logging in.
– We use:
+ AngularFireAuth.auth.createUserWithEmailAndPassword() to sign up new account.
+ AngularFireAuth.auth.signInWithEmailAndPassword() to log in.
+ AngularFireAuth.auth.signOut() to log out.
– We also catch Exception to get Error information and throw it for register/login validation (Error will be catch later at Component which uses this service’s functions)
*/

import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
 
@Injectable()
export class AuthNewService {
 
  authState: any = null;
 
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
 
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email']
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }
 
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
    console.log("User signed out")
  }
}