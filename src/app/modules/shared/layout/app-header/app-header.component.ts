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
    this.getWorkGroups(localStorage.getItem('authorizationData'));
    this.startSyncingData();

    // if (window.location.hash && !localStorage.getItem('authorizationData')) {
      
    // }
  }

  startSyncingData() {
    this.signalR.startConnection();
    this.signalR.notificationEvents.subscribe((data) => {
      //console.log(data);
      // this.getWorkGroups(localStorage.getItem('authorizationData'))
      if(this.sharedService.workGroupListItem.toLowerCase() == data.workgroup.toLowerCase())
        this.getMainData(data.workgroup);
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
  workgroupItem = '';
  getMainData(workgroup) {
    // this.showLoader = true;
    
    let token = localStorage.getItem('authorizationData');
    // this.getWorkGroups(token);
    let workGroupItem = this.sharedService.workGroupListItem;
   
    if(workgroup === workGroupItem){
     
      this.kpiService.getKpiData(token, workgroup).subscribe((val: any) => {
        //console.log('data', val);
        this.sharedService.charts.emit(val.charts);
        this.sharedService.allData.emit(val.statistics);
        // this.showLoader = false;
      });
    }else{
      return;
    }
   

    //  setTimeout(() => {
    //   this.sharedService.allData.emit(this.data.statistics);
    //   console.log('this.test', this.data.statistics);
    // }, 2000);
  }
  woekGroups;
  getWorkGroups(token) {
    this.showLoader = true;
    this.kpiService.getWorkGroups(token).subscribe((val) => {
      console.log('data', val);
      this.woekGroups = val;
      this.sharedService.workGroupData.emit(this.woekGroups);
      this.showLoader = false;
    });
  }
}
