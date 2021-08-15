import { Component, OnInit, Inject } from '@angular/core';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { KpiService } from 'src/app/services/kpi.service';

import { AppSettings } from '../../../../../app/core/settings/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  currentLang: string;
  currentDate = new Date();
  showLoader: boolean = false;
  position: string = null;
  data = {
    id: '9efd608f-5b2b-4c7b-bd12-7615400f8341',
    title: '2P',
    description: 'Perfect Presentaion',
    dashboardType: 1,
    statistics: [
      {
        name: 'Longest waiting time',
        brief: 'Longest waiting time',
        readValue: 0,
        orderIndex: 14,
        color: '#000004',
        readDate: '2021-08-15T08:33:31.5969482',
        kpiTypeId: 1,
      },
      {
        name: 'Waiting Call Count',
        brief: 'Waiting Call Count',
        readValue: 0,
        orderIndex: 8,
        color: '#000001',
        readDate: '2021-08-15T08:33:31.5969482',
        kpiTypeId: 1,
      },
      {
        name: 'Received Call Count',
        brief: 'Received Call Count',
        readValue: 0,
        orderIndex: 2,
        color: '#000001',
        readDate: '2021-08-15T08:21:19.9978627',
        kpiTypeId: 1,
      },
      {
        name: 'Missed Call Count',
        brief: 'Missed Call Count',
        readValue: 0,
        orderIndex: 3,
        color: '#000001',
        readDate: '2021-08-15T08:21:19.9978627',
        kpiTypeId: 1,
      },
      {
        name: 'Incoming Call Count',
        brief: 'Incoming Call Count',
        readValue: 0,
        orderIndex: 1,
        color: '#000001',
        readDate: '2021-08-15T08:21:19.9978627',
        kpiTypeId: 1,
      },
      {
        name: 'Average Call',
        brief: 'Average Call',
        readValue: 0,
        orderIndex: 7,
        color: '#000001',
        readDate: '2021-08-15T08:33:31.5969482',
        kpiTypeId: 1,
      },
      {
        name: 'Service Level',
        brief: 'Service Level',
        readValue: 0,
        orderIndex: 6,
        color: '#000001',
        readDate: '2021-08-15T08:21:19.9978627',
        kpiTypeId: 1,
      },
      {
        name: 'Average waiting time',
        brief: 'Average waiting time',
        readValue: 0,
        orderIndex: 15,
        color: '#000002',
        readDate: '2021-08-15T08:33:31.5969482',
        kpiTypeId: 1,
      },
    ],
  };
  constructor(
    private kpiService: KpiService,
    private oidcSecurityService: OidcSecurityService,
    private http: HttpClient,
    private translate: TranslateService,
    private sharedService: SharedServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.changeLangage(localStorage.getItem('lang') || AppSettings.defaultLang);
  }
  // tslint:disable-next-line:no-inferrable-types
  themeIdentity: string = 'light';

  ngOnInit(): void {
    this.sharedService.themeIdentity.subscribe((result) => {
      this.themeIdentity = result;
    });
    this.oidcSecurityService.checkAuth().subscribe(
      (auth) => {
        console.log('is authenticated', auth);
        this.getMainData();
      },
      (error) => {
        this.login();
      }
    );
  }
  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
  changeLangage(lang: string) {
    const htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    lang == 'ar-SA' ? (this.position = 'end') : (this.position = 'start');
    this.sharedService.Lang.emit(lang);
    htmlTag.lang = lang === 'ar-SA' ? 'styles-ar.css' : 'styles-en.css';
    this.translate.setDefaultLang(lang);

    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);

    lang == 'ar-SA'
      ? this.addCss('styles-ar.css')
      : this.addCss('styles-en.css');
  }
  addCss(fileName) {
    const head = this.document.getElementsByTagName('head')[0];
    const link = this.document.createElement('link');
    const existId = this.document.getElementById('theme') as HTMLLinkElement;
    if (existId) {
      existId.href = fileName;
    } else {
      link.id = 'theme';

      link.rel = 'stylesheet';
      link.href = fileName;

      head.appendChild(link);
    }
  }
  getMainData() {
    this.showLoader = true;
    this.kpiService.getKpiData().subscribe((val) => {
      console.log('data', val);

      this.showLoader = false;
    });

    // setTimeout(() => {
    //   this.sharedService.allData.emit(this.data.statistics);
    //   console.log('this.test', this.data.statistics);
    // }, 2000);
  }
}
