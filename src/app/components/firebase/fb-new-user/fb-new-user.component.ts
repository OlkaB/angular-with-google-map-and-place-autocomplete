import { Component, OnInit } from '@angular/core';
import { AuthNewService } from '../../../services/firebase-new-auth.service';

@Component({
  selector: 'app-fb-new-user',
  templateUrl: './fb-new-user.component.html',
  styleUrls: ['./fb-new-user.component.css'],
  providers: [AuthNewService]
})
export class FbNewUserComponent implements OnInit {

	email = '';
  password = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};


  constructor(public authService: AuthNewService) { }

  ngOnInit() {
  }

  onSignUp(): void {
  	console.log("SignupStarted");
    //if (this.validateForm(this.email, this.password)) {
    	console.log("email and password valid");
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          console.log("New user signed up: ", this.email, this.password);
        }).catch(_error => {
          this.error = _error
          console.log("error onSignUp. ", this.error);
        })
    //}
  }
 
  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => {console.log("onLoginEmail: ", this.email, this.password)
      }).catch(_error => {
          this.error = _error
          console.log("error onLoginEmail. ", this.error);
        })
    }
  }
 
  validateForm(email: string, password: string): void {
    // validate this.errorMessage
  }

}
