import { Injectable, EventEmitter } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}`)
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
    this._hubConnection.on('receiveNotification', (data) => {
      this.notificationEvents.emit(data);
    });
  };

  startHttpRequest() {
    return this.http.get<any>(`${environment.apiUrl}`);
  }
}
