import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

// https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HomeComponent } from './core/home/home.component';
import { LayoutComponent } from './modules/shared/layout/layout.component';
import { AppHeaderComponent } from './modules/shared/layout/app-header/app-header.component';
import { SideNavComponent } from './modules/shared/layout/side-nav/side-nav.component';
import { SideNavChartComponent } from './modules/shared/layout/side-nav-chart/side-nav-chart.component';
import { LoginComponent } from './modules/identity/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './modules/identity/login/login-form/login-form.component';
import { DashboardCardComponent } from './core/dashboard-card/dashboard-card.component';
import { DashboardCardEmployeeComponent } from './core/dashboard-card-employee/dashboard-card-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IdentityLayoutComponent } from './modules/identity/identity-layout/identity-layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsComponent } from './modules/shared/charts/charts.component';
import { AppSettings } from './core/settings/app-settings';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {ErrorInterceptor} from "../app/core/interceptors/error.interceptor"
import { createTranslateLoader } from './core/utilities/translate';
import { ArabicNumbersPipe } from './modules/shared/custom-pips/arabic-numbers.pipe';
import { LocalizedDatePipe } from './modules/shared/custom-pips/localized-date.pipe';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { SpinnersAngularModule } from 'spinners-angular';
import localeAr from '@angular/common/locales/ar-SA';
import { LocalizedDateNumbersPipe } from './modules/shared/custom-pips/localized-date-numbers.pipe';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
 // { path: '', redirectTo: '/home', pathMatch: 'full' },
];
registerLocaleData(localeAr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    AppHeaderComponent,
    SideNavComponent,
    SideNavChartComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardCardComponent,
    DashboardCardEmployeeComponent,
    IdentityLayoutComponent,
    ChartsComponent,
    ArabicNumbersPipe,
    LocalizedDatePipe,
    LocalizedDateNumbersPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AppRoutingModule,
    ButtonsModule,
    NgxChartsModule,
    SpinnersAngularModule,
    RoundProgressModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AuthModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: AppSettings.defaultLang,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'en-US' },
    
    {
      provide: HTTP_INTERCEPTORS,
     useClass:ErrorInterceptor,
     multi:true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
