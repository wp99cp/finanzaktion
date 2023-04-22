import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './pages/start-page/start-page.component';
import {LiveFeedComponent} from './pages/live-feed/live-feed.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {SponsorenOverviewComponent} from './pages/sponsoren-overview/sponsoren-overview.component';
import {SponsorenErfassenComponent} from './pages/sponsoren-erfassen/sponsoren-erfassen.component';
import {VeloRouteSinaiComponent} from './page/velo-route-sinai/velo-route-sinai.component';
import {KontoSettingsComponent} from './page/konto-settings/konto-settings.component';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OauthCallbackComponent} from './page/oauth-callback/oauth-callback.component';
import {RegisterParticipantComponent} from './pages/register-participant/register-participant.component';
import {WettbewerbComponent} from './pages/wettbewerb/wettbewerb.component';
import {DatenschutzerklaerungComponent} from './pages/datenschutzerklaerung/datenschutzerklaerung.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {DirektSpendeComponent} from './pages/direkt-spende/direkt-spende.component';

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
    path: 'gewinnen',
    component: WettbewerbComponent
  },

  {
    path: 'direkt-spende',
    component: DirektSpendeComponent
  },

  {
    path: 'app/register',
    component: RegisterParticipantComponent
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

  {
    path: 'datenschutz',
    component: DatenschutzerklaerungComponent
  },

  {
    path: 'app/registrieren',
    component: SignUpComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
