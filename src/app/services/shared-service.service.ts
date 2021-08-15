import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  themeIdentity = new EventEmitter();
  allData = new EventEmitter();
  Lang = new EventEmitter();
  constructor() {}
}
