import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  public oldSponsoren: Observable<any[]>;
  public showOldSponsoren = false;

  constructor(private dbService: DatabaseServiceService, private route: ActivatedRoute) {

    this.sponsoren = this.route.params.pipe(mergeMap(params =>
      dbService.load_sponsoren(params.partId)));

    this.oldSponsoren = this.route.params.pipe(mergeMap(params =>
      dbService.load_sponsoren_old(params.partId)));

    this.oldSponsoren.subscribe(sp => console.log(sp));

  }

  ngOnInit(): void {


  }

  public show_old_sponsoren(): void {


    this.showOldSponsoren = true;

  }

  public copy_old_sponsor(sponsor: any): void {

    this.dbService.createDocument('sponsoren', sponsor);
    this.showOldSponsoren = false;

  }


  deleteSponsor(sponsor: any) {

    console.log('Delete: sponsoren/' + sponsor.id);

    this.dbService.delete('sponsoren/' + sponsor.id).then(r => console.log);

  }
}
