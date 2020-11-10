import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  private partID = undefined;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,) {
  }


  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {

      this.partID = params.partId;

      if (!this.partID) {

        alert('select participant!!');

      }


    });

  }

  signOut() {

    this.fireAuth.signOut();
    this.router.navigate(['..']);


  }

  async isSignedIn() {


    return await new Promise(resolve =>
      this.fireAuth.authState.subscribe(user =>
        resolve(user === null)));


  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
