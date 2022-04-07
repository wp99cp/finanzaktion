import {Component, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import auth = firebase.auth;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {


  constructor(private fireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {

    this.fireAuth.app.then(app => {

      const ui = new firebaseui.auth.AuthUI(app.auth());

      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: 'app/oauth-callback',

        signInOptions: [
          auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Other config options...
      });

    });

  }

}
