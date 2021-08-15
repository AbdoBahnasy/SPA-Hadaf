import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';
import { CallsType } from '../enums/enums';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  // fake api for calls
  callsData = [];
  lang = localStorage.getItem('lang');

  constructor(private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getData();
    this.sharedService.Lang.subscribe((val) => {
      this.lang = val;
    });
  }
  dataToRender = [];
  getData() {
    this.sharedService.allData.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].kpiTypeId == 1) {
          this.dataToRender.push({
            name: data[i].name,
            brief: data[i].brief,
            readValue: data[i].readValue,
            orderIndex: data[i].orderIndex,
            color: data[i].color,
            readDate: data[i].readDate,
          });
        }
      }
      this.callsData = this.dataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
  }
}
