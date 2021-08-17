import { Component, OnInit, Inject } from '@angular/core';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { KpiService } from 'src/app/services/kpi.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { AppSettings } from '../../../../../app/core/settings/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
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
    private signalR: SignalRService,
    private kpiService: KpiService,
    private oidcSecurityService: OidcSecurityService,
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
    debugger;

    // console.log('identity component, checking authorized' + this.sharedService.userValue);
    // this.authenticated = this.sharedService.userValue;

    // if (this.authenticated) {
    //   console.log('is already authenticated', this.authenticated);
    //   this.oidcSecurityService.checkAuth().subscribe(
    //     (auth) => {
    //       if (auth == true) {
    //         this.sharedService.userValue = auth;
    //         console.log('is authenticated', auth);
    //         localStorage.setItem('authenticated', auth + '');
    //         this.getMainData();
    //         this.getWoekGroups();
    //       }
    //     },
    //     (error) => { }
    //   );
    // }
    // else {
    //   this.authorize();
    // }
  }

  public Authorize() {
    debugger;
    localStorage.removeItem('authorizationData');
    let authorizationUrl = environment.mainURL + '/connect/authorize';
    let client_id = 'js';
    let redirect_uri = location.origin;
    let response_type = 'id_token token';
    let scope = 'openid profile dashboards dashboards.signalrhub';
    let nonce = 'N' + Math.random() + '' + Date.now();
    let state = Date.now() + '' + Math.random();

    localStorage.setItem('authStateControl', state);
    localStorage.setItem('authNonce', nonce);

    let url =
      authorizationUrl +
      '?' +
      'response_type=' +
      encodeURI(response_type) +
      '&' +
      'client_id=' +
      encodeURI(client_id) +
      '&' +
      'redirect_uri=' +
      encodeURI(redirect_uri) +
      '&' +
      'scope=' +
      encodeURI(scope) +
      '&' +
      'nonce=' +
      encodeURI(nonce) +
      '&' +
      'state=' +
      encodeURI(state);

    window.location.href = url;
  }

  public AuthorizedCallback() {
    debugger;
    this.sharedService.userValue = false;

    let hash = window.location.hash.substr(1);

    let result: any = hash
      .split('&')
      .reduce(function (result: any, item: string) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});

    console.log(result);

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {
      if (result.state !== localStorage.getItem('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {
        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== localStorage.getItem('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          localStorage.setItem('authNonce', '');
          localStorage.setItem('authStateControl', '');

          authResponseIsValid = true;
          this.proceedToGetData(token, id_token);
          console.log(
            'AuthorizedCallback state and nonce validated, returning access token'
          );

          // this.oidcSecurityService.authorize();
        }
      }
    }
    debugger;
  }
  proceedToGetData(token, id_token) {
    this.SetAuthorizationData(token, id_token);

    this.getMainData(token);
    // this.getWoekGroups(token);
  }
  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];

      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }

  public SetAuthorizationData(token: any, id_token: any) {
    if (localStorage.getItem('authorizationData') !== '') {
      localStorage.setItem('authorizationData', '');
    }

    localStorage.setItem('authorizationData', token);
    localStorage.setItem('authorizationDataIdToken', id_token);

    this.sharedService.userValue = true;

    localStorage.setItem('IsAuthorized', 'true');
  }

  startSyncingData() {
    this.signalR.startConnection();
    this.signalR.notificationEvents.subscribe((data) => {
      // this.getMainData();
    });
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
  getMainData(token) {
    this.showLoader = true;
    this.kpiService.getKpiData(token).subscribe((val: any) => {
      console.log('data', val);
      this.sharedService.allData.emit(val.statistics);
      this.showLoader = false;
      this.getWoekGroups(token);
    });

    // setTimeout(() => {
    //   this.sharedService.allData.emit(this.data.statistics);
    //   console.log('this.test', this.data.statistics);
    // }, 2000);
  }
  woekGroups;
  getWoekGroups(token) {
    this.showLoader = true;
    this.kpiService.getWorkGroups(token).subscribe((val) => {
      console.log('data', val);
      this.woekGroups = val;
      this.sharedService.workGroupData.emit(this.woekGroups);
      this.showLoader = false;
      window.location.href = window.location.origin + '/home';
    });
  }
}
