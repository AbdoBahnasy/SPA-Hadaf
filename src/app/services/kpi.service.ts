import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '@app/core/settings/app-settings';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) {}
  token = this.oidcSecurityService.getToken();
  lang = localStorage.getItem('lang') || AppSettings.defaultLang;
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      lang: this.lang,
    }),
  };
  getKpiData() {
    return this.http.get(
      `${environment.apiUrl}/Dashboards/statistics`,
      this.httpOptions
    );
  }
  getWorkGroups() {
    return this.http.get(
      `${environment.apiUrl}/Statistics/getWorkgroups`,
      this.httpOptions
    );
  }
}
