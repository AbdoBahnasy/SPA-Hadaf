import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  themeIdentity = new EventEmitter();
  allData = new EventEmitter();
  charts = new EventEmitter();
  workGroupItem=new EventEmitter();
  workGroupListItem = 'IT-Business';
  workGroupData = new EventEmitter();
  Lang = new EventEmitter();
  private userSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public get userValue(): boolean {
    return this.userSubject.value;
  }
  public set userValue(val) {
    this.userSubject.next(val);
    if (val == false) {
      localStorage.setItem('authorizationData', '');
      localStorage.setItem('authorizationDataIdToken', '');
      localStorage.setItem('IsAuthorized', 'false');
    }
  }
  constructor() {}
}
