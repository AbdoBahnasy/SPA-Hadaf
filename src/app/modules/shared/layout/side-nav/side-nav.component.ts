import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from './../../../../services/shared-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {

  }

  changingTheme(val): void {
    this.sharedService.themeIdentity.emit(val);
  }










}
