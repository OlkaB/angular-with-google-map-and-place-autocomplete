import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/firebase-anonym-auth.service';


@Component({
  selector: 'app-fb-anonymous-auth',
  templateUrl: './fb-anonymous-auth.component.html',
  styleUrls: ['./fb-anonymous-auth.component.css'],
  providers: [AuthService]
})
export class FbAnonymousAuthComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signInAnonymously() {
    this.authService.anonymousLogin()
      .then(() => console.log("User anonymously signed in"));
  }

  logout() {
    this.authService.signOut();
  }

}
