import { Component, OnInit } from '@angular/core';
import { KpiService } from '@app/services/kpi.service';
import { SharedServiceService } from '@app/services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gradient = false;
  max: any = 100;
  current: any = 70;
  data = [];
  chartData = [];

  lang = localStorage.getItem('lang');

  constructor(
    private sharedService: SharedServiceService,
    private kpiService: KpiService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.sharedService.Lang.subscribe((val) => {
      this.lang = val;
    });
    this.getWorkGroupList();
  }
  dataToRender = [];
  chartrDataToRender = [];
  //data
  WorkGroupList = [];
  getWorkGroupList() {
    this.sharedService.workGroupData.subscribe((data) => {
      this.WorkGroupList = data;
      console.log('data retrived', data);
      if (data.length > 0) this.getMainData(data[0].key);
    });
  }
  getData() {
    this.sharedService.allData.subscribe((data) => {
      this.dataToRender = [];
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

      this.data = this.dataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
    this.sharedService.charts.subscribe((data) => {
      this.dataToRender = [];
      for (let i = 0; i < data.length; i++) {
        if (data && data.length > 0) {
          this.chartrDataToRender.push({
            name: data[i].name,
            brief: data[i].brief,
            orderIndex: data[i].orderIndex,
            data: data[i].data,
            kpiTypeId: data[i].kpiTypeId,
          });
        }
      }

      this.chartData = this.chartrDataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
  }

  workgroupItem = '';
  getMainData(val) {
    this.sharedService.workGroupListItem = val
    // this.showLoader = true;
    let token = localStorage.getItem('authorizationData');
    // this.getWorkGroups(token);
    //this.sharedService.workGroupItem.emit(val)
    this.kpiService.getKpiData(token, val).subscribe((val: any) => {
      console.log('data', val);
      this.sharedService.allData.emit(val.statistics);
      this.sharedService.charts.emit(val.charts);
      // this.showLoader = false;
    });

    // setTimeout(() => {
    //   this.sharedService.allData.emit(this.data.statistics);
    //   console.log('this.test', this.data.statistics);
    // }, 2000);
  }
}
