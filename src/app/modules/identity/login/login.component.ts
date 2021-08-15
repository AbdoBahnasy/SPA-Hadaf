import { Component, OnInit, Inject } from '@angular/core';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AppSettings } from '../../../core/settings/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  currentLang: string;
  constructor(
    private translate: TranslateService,
    private sharedService: SharedServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.changeLangage(localStorage.getItem('lang') || AppSettings.defaultLang);
  }

  ngOnInit(): void {}
  changeLangage(lang: string) {
    const htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;

    htmlTag.lang = lang === 'ar-SA' ? 'AR' : 'EN';
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
}
