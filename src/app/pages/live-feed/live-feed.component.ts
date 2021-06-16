import {Component} from '@angular/core';
import {DatabaseServiceService} from '../../services/database-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.sass']
})
export class LiveFeedComponent {

  public liveFeed;

  public statistics: Observable<any>;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [ 'Gesammelte Spenden', 'Restbetrag zum Spendenziel'];
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [];
  public spendenziel = 4_500;

  constructor(private dbService: DatabaseServiceService) {

    this.liveFeed = this.dbService.loadLiveFeed()
      .pipe(map(docAction => docAction.map(doc => {
        const data: any = doc.payload.doc.data();
        data.id = doc.payload.doc.id;
        return data;
      })));

  }

}
