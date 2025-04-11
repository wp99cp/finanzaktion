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

  async signIn(): Promise<void> {

    this.location.replaceState('app/oauth-callback');

    console.log('signIn');
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(
      (error) => {
        console.error('Error signing in:', error);
      }
    );
    this.fireAuth.currentUser.then((user) => {
      if (user !== null) {
        console.log(user);
      } else {
        console.log('No user is signed in.');
      }

    }).catch((error) => {
      console.error('Error signing in:', error);
    })


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
