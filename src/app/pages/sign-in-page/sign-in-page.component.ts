import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.sass']
})
export class SignInPageComponent implements OnInit {

  public invalideUsername = false;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit(): void {

    this.fireAuth.authState.subscribe(user => {

      if (user === null)
        return;

      this.router.navigate(['/app/mitmachen']);


    });

  }

  signIn(): void {

    this.location.replaceState('app/oauth-callback');

    this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.fireAuth.currentUser.then((user) => {

      if (user !== null) {

      }

    });


  }

  signInWithUsername() {

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.invalideUsername = false;
        this.router.navigate(['app/oauth-callback']);
      })
      .catch(err => {
        this.invalideUsername = true;
        console.log(err);
      });


  }

}
