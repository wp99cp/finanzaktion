import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DatabaseServiceService} from '../../services/database-service.service';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-routen-overview',
  templateUrl: './routen-overview.component.html',
  styleUrls: ['./routen-overview.component.sass']
})
export class RoutenOverviewComponent implements OnInit {

  public routen: Observable<any[]>;

  constructor(private dbService: DatabaseServiceService, private route: ActivatedRoute) {

    this.routen = this.route.params.pipe(mergeMap(params =>
      dbService.load_routen(params.partId)));
    this.routen.subscribe(sp => console.log(sp));

  }
  ngOnInit(): void {
  }

  deleteRoute(route: any) {

    console.log('Delete: routes/' + route.id);
    this.dbService.delete('routes/' + route.id).then(r => console.log);

  }


}
