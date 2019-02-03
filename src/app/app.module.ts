import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent, NewSubjectDialog, NewSemsiterDialog } from './report/report.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GradeCalcComponent } from './grade-calc/grade-calc.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieSnackbarComponent } from './cookie-snackbar/cookie-snackbar.component';
import { HelperService } from './helper.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    WelcomeComponent,
    NewSubjectDialog,
    NewSemsiterDialog,
    SidebarComponent,
    GradeCalcComponent,
    CookieSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  providers: [
    HelperService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewSubjectDialog,
    NewSemsiterDialog,
    CookieSnackbarComponent
  ]
})
export class AppModule { }
