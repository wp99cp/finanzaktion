import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  public isSignedIn = false;
  private routeSub: Subscription;
  private partID = undefined;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute) {

    this.fireAuth.authState.subscribe(user => {
      this.isSignedIn = (user !== null);

      if (this.isSignedIn) {

        this.routeSub = this.route.params.subscribe(params => {

          this.partID = params.partId;

          if (!this.partID) {

            this.router.navigate(['app/register']);

          }

        });
      }

    });

  }


  ngOnInit(): void {


  }

  signOut() {

    this.fireAuth.signOut();
    this.router.navigate(['..']);


  }

  ngOnDestroy(): void {

    if (this.routeSub)
      this.routeSub.unsubscribe();

  }

}
