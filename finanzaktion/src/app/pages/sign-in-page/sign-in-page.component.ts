import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.sass']
})
export class SignInPageComponent implements OnInit {

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

    this.fireAuth.signInWithRedirect(new auth.GoogleAuthProvider())
    this.fireAuth.currentUser.then((user) => {

      if (user !== null) {

      }

    });


  }

}
