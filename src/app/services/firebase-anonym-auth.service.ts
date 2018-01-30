import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
 
@Injectable()
export class AuthService {
 
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
    return (this.authState !== null) ? this.authState.uid : '';
  }
 
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
      })
      .catch(error => console.log(error));
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
  }
}