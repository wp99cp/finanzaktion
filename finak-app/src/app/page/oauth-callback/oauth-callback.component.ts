import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.sass']
})
export class OauthCallbackComponent implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  ngOnInit(): void {

    this.fireAuth.authState.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['/app/mitmachen']);
      }
    });

  }

}
