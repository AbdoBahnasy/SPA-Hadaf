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
  getKpiData() {
    const token = this.oidcSecurityService.getToken();
    const lang = localStorage.getItem('lang') || AppSettings.defaultLang;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        lang: lang,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/Dashboards/GetDashboardKPI`,
      httpOptions
    );
  }
}
