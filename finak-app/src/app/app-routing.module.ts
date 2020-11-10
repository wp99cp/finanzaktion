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
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OauthCallbackComponent} from './page/oauth-callback/oauth-callback.component';

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
    path: 'app/mitmachen',
    component: OverviewPageComponent
  },

  {
    path: 'app/:partId/mitmachen',
    component: OverviewPageComponent
  },
  {
    path: 'app/oauth-callback',
    component: OauthCallbackComponent
  },

  {
    path: 'app/:partId/routen',
    component: RoutenOverviewComponent
  },

  {
    path: 'app/:partId/routen/erfassen',
    component: RouteFinderComponent
  },

  {
    path: 'app/:partId/sponsoren',
    component: SponsorenOverviewComponent
  },

  {
    path: 'app/:partId/sponsoren/erfassen',
    component: SponsorenErfassenComponent
  },

  {
    path: 'app/:partId/sponsoren/erfassen/:id',
    component: SponsorenErfassenComponent
  },

  {
    path: 'beispiele/sinai',
    component: VeloRouteSinaiComponent
  },

  {
    path: 'app/settings',
    component: KontoSettingsComponent
  },

  {
    path: 'app/anmelden',
    component: SignInPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
