import { Injectable, EventEmitter } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _hubConnection: HubConnection;

  public notificationEvents = new EventEmitter<any>();

  constructor(private http: HttpClient) {
    // this.startConnection();
  }

  public startConnection = () => {
    let token = localStorage.getItem('authorizationData');
    // let headers = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token
    //   }),
    // };
    
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.signalRserver}/hub/notificationhub?access_token=${token}` )
      .build();
    this._hubConnection
      .start()
      .then(() => {
        console.log('started');
        this.receiveNotification();
      })
      .catch(() => {
        console.log('Error connection');
      });
  };

  public receiveNotification = () => {
    this._hubConnection.on('UpdatedDashboardKPIState', (data) => {
      debugger;
      this.notificationEvents.emit(data);
    });
  };

  startHttpRequest() {
    return this.http.get<any>(`${environment.apiUrl}`);
  }
}
