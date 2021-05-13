import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {StockService} from './stock.service';
import {WebcamService} from './webcam.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RouteFinderComponent} from './pages/route-finder/route-finder.component';
import {StartPageComponent} from './pages/start-page/start-page.component';
import {TemplateHeaderComponent} from './_template/template-header/template-header.component';
import {MainMenuComponent} from './_template/main-menu/main-menu.component';
import {HeaderNavComponent} from './_template/header-nav/header-nav.component';
import {TemplateFooterComponent} from './_template/template-footer/template-footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {LiveFeedComponent} from './pages/live-feed/live-feed.component';
import {RoutenOverviewComponent} from './pages/routen-overview/routen-overview.component';
import {SponsorenOverviewComponent} from './pages/sponsoren-overview/sponsoren-overview.component';
import {SponsorenErfassenComponent} from './pages/sponsoren-erfassen/sponsoren-erfassen.component';
import {VeloRouteSinaiComponent} from './page/velo-route-sinai/velo-route-sinai.component';
import {KontoSettingsComponent} from './page/konto-settings/konto-settings.component';
import {OauthCallbackComponent} from './page/oauth-callback/oauth-callback.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RegisterParticipantComponent} from './pages/register-participant/register-participant.component';
import {MatButtonModule} from '@angular/material/button';
import {WettbewerbComponent} from './pages/wettbewerb/wettbewerb.component';
import {DatenschutzerklaerungComponent} from './pages/datenschutzerklaerung/datenschutzerklaerung.component';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {mergeMap} from 'rxjs/operators';
import { SimpleDialogComponent } from './dialoges/simple-dialog/simple-dialog.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {ChartsModule} from 'ng2-charts';
import { UploadTrackingFileComponent } from './pages/upload-tracking-file/upload-tracking-file.component';
import { DirektSpendeComponent } from './pages/direkt-spende/direkt-spende.component';
import { QAndAComponent } from './pages/subcomponents/q-and-a/q-and-a.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    OverviewPageComponent,
    RouteFinderComponent,
    StartPageComponent,
    TemplateHeaderComponent,
    TemplateFooterComponent,
    MainMenuComponent,
    HeaderNavComponent,
    LiveFeedComponent,
    RoutenOverviewComponent,
    SponsorenOverviewComponent,
    SponsorenErfassenComponent,
    VeloRouteSinaiComponent,
    KontoSettingsComponent,
    OauthCallbackComponent,
    RegisterParticipantComponent,
    WettbewerbComponent,
    DatenschutzerklaerungComponent,
    SimpleDialogComponent,
    SignUpComponent,
    UploadTrackingFileComponent,
    DirektSpendeComponent,
    QAndAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Matraum App'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ChartsModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    StockService,
    WebcamService
  ],
  bootstrap: [AppComponent],
  exports: [MatFormFieldModule, MatInputModule]
})
export class AppModule {

  constructor(private  messaging: AngularFireMessaging) {

    this.messaging.requestPermission
      .pipe(mergeMap(() => {
        console.log('OK!');
        return messaging.getToken;
      })).subscribe(token => {
        console.log(token);
    }, err => console.log(err));

    this.messaging.onMessage(payload => console.log(payload))
      .then(r => console.log());
  }

}
