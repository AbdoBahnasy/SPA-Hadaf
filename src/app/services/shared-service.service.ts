import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  themeIdentity = new EventEmitter();
  allData = new EventEmitter();
  workGroupData = new EventEmitter();
  Lang = new EventEmitter();
  private userSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public get userValue(): boolean {
    return this.userSubject.value;
  }
  public set userValue(val) {
    this.userSubject.next(val);
  }
  constructor() {}
}
