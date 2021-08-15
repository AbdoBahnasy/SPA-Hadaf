import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';

@Component({
  selector: 'app-dashboard-card-employee',
  templateUrl: './dashboard-card-employee.component.html',
  styleUrls: ['./dashboard-card-employee.component.css'],
})
export class DashboardCardEmployeeComponent implements OnInit {
  employees = [];
  lang = localStorage.getItem('lang');
  constructor(private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getData();
    this.sharedService.Lang.subscribe((val) => {
      this.lang = val;
    });
  }
  dataToRender = [];
  //employees
  getData() {
    this.sharedService.allData.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].kpiTypeId == 2) {
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
      this.employees = this.dataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
  }
}
