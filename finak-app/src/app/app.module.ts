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
import { RoutenOverviewComponent } from './pages/routen-overview/routen-overview.component';
import { SponsorenOverviewComponent } from './pages/sponsoren-overview/sponsoren-overview.component';
import { SponsorenErfassenComponent } from './pages/sponsoren-erfassen/sponsoren-erfassen.component';
import { VeloRouteSinaiComponent } from './page/velo-route-sinai/velo-route-sinai.component';
import { KontoSettingsComponent } from './page/konto-settings/konto-settings.component';
import { OauthCallbackComponent } from './page/oauth-callback/oauth-callback.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from "@angular/material/checkbox";


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
    OauthCallbackComponent
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
    MatCheckboxModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    StockService,
    WebcamService
  ],
  bootstrap: [AppComponent],
  exports:[ MatFormFieldModule, MatInputModule]
})
export class AppModule { }
