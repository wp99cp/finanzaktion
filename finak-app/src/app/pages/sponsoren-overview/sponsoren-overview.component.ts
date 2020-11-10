import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DatabaseServiceService} from '../../services/database-service.service';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-sponsoren-overview',
  templateUrl: './sponsoren-overview.component.html',
  styleUrls: ['./sponsoren-overview.component.sass']
})
export class SponsorenOverviewComponent implements OnInit {

  public sponsoren: Observable<any[]>;

  constructor(dbService: DatabaseServiceService, private route: ActivatedRoute) {

    this.sponsoren = this.route.params.pipe(mergeMap(params =>
      dbService.load_sponsoren(params.partId)));
    this.sponsoren.subscribe(sp => console.log(sp));

  }

  ngOnInit(): void {


  }





}
