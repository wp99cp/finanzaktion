import {Component} from '@angular/core';
import {DatabaseServiceService} from '../../services/database-service.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.sass']
})
export class LiveFeedComponent {

  public statistics: Observable<any>;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Restbetrag zum Spendenziel', 'Gesammelte Spenden'];
  public barChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData = [];
  public spendenziel = 2_500;

  constructor(dbService: DatabaseServiceService) {

    this.statistics = dbService.loadStatistics();

    this.statistics.subscribe(doc => {

      const totalSpenden = doc.payload.data().totalSpenden;
      const delta = this.spendenziel - totalSpenden;

      this.barChartData = [
        {data: [delta > 0 ? delta : 0, totalSpenden], label: 'gesammelt'},
      ];
    });

  }

}
