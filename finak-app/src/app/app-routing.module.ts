import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './pages/start-page/start-page.component';
import {LiveFeedComponent} from './pages/live-feed/live-feed.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {RouteFinderComponent} from './pages/route-finder/route-finder.component';
import {RoutenOverviewComponent} from './pages/routen-overview/routen-overview.component';
import {SponsorenOverviewComponent} from './pages/sponsoren-overview/sponsoren-overview.component';
import {SponsorenErfassenComponent} from './pages/sponsoren-erfassen/sponsoren-erfassen.component';
import {VeloRouteSinaiComponent} from './page/velo-route-sinai/velo-route-sinai.component';
import {KontoSettingsComponent} from './page/konto-settings/konto-settings.component';

const routes: Routes = [

  {
    path: '',
    component: StartPageComponent
  },

  {
    path: 'live',
    component: LiveFeedComponent
  },

  {
    path: 'mitmachen',
    component: OverviewPageComponent
  },

  {
    path: 'app/routen',
    component: RoutenOverviewComponent
  },

  {
    path: 'app/routen/erfassen',
    component: RouteFinderComponent
  },

  {
    path: 'app/sponsoren',
    component: SponsorenOverviewComponent
  },

  {
    path: 'app/sponsoren/erfassen',
    component: SponsorenErfassenComponent
  },

  {
    path: 'beispiele/sinai',
    component: VeloRouteSinaiComponent
  }

  ,

  {
    path: 'app/settings',
    component: KontoSettingsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
