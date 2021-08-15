import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';

@Component({
  selector: 'app-side-nav-chart',
  templateUrl: './side-nav-chart.component.html',
  styleUrls: ['./side-nav-chart.component.css'],
})
export class SideNavChartComponent implements OnInit {
  max: any = 100;
  current: any = 70;
  chartData = [];
  averageCall = null;
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
        if (data[i].kpiTypeId == 3) {
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
      this.chartData = this.dataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
  }
}
