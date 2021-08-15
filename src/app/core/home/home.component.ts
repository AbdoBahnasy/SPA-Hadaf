import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  max: any = 100;
  current: any = 70;
  data = [];
  chartData = [];
  legendPosition: string = 'below';
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = false;
  lang = localStorage.getItem('lang');
  fitContainer: any[] = [700, 180];

  timeline = false;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  showLabels = false;
  surveyData = [
    { name: 'test01', value: 105000 },
    { name: 'test02', value: 55000 },
    { name: 'test03', value: 15000 },
    { name: 'test04', value: 150000 },
    { name: 'test05', value: 20000 },
    { name: 'test06', value: 10000 },
    { name: 'test07', value: 50000 },
  ];
  messageData = [
    {
      name: 'France',
      value: 36745,
      extra: {
        code: 'fr',
      },
    },
    {
      name: 'United Kingdom',
      value: 36240,
      extra: {
        code: 'uk',
      },
    },
    {
      name: 'Spain',
      value: 33000,
      extra: {
        code: 'es',
      },
    },
    {
      name: 'Italy',
      value: 35800,
      extra: {
        code: 'it',
      },
    },
  ];
  multi = [
    {
      name: 'Jordan',
      series: [
        {
          value: 2247,
          name: '2016-09-13T22:44:59.258Z',
        },
        {
          value: 5176,
          name: '2016-09-20T04:59:15.976Z',
        },
        {
          value: 6962,
          name: '2016-09-16T10:01:09.635Z',
        },
        {
          value: 3893,
          name: '2016-09-14T22:05:54.103Z',
        },
        {
          value: 3706,
          name: '2016-09-20T12:19:18.859Z',
        },
      ],
    },
    {
      name: 'Colombia',
      series: [
        {
          value: 5416,
          name: '2016-09-13T22:44:59.258Z',
        },
        {
          value: 3465,
          name: '2016-09-20T04:59:15.976Z',
        },
        {
          value: 5759,
          name: '2016-09-16T10:01:09.635Z',
        },
        {
          value: 4376,
          name: '2016-09-14T22:05:54.103Z',
        },
        {
          value: 2090,
          name: '2016-09-20T12:19:18.859Z',
        },
      ],
    },
    {
      name: 'Sudan',
      series: [
        {
          value: 4222,
          name: '2016-09-13T22:44:59.258Z',
        },
        {
          value: 3204,
          name: '2016-09-20T04:59:15.976Z',
        },
        {
          value: 2168,
          name: '2016-09-16T10:01:09.635Z',
        },
        {
          value: 6261,
          name: '2016-09-14T22:05:54.103Z',
        },
        {
          value: 4713,
          name: '2016-09-20T12:19:18.859Z',
        },
      ],
    },
    {
      name: 'Samoa',
      series: [
        {
          value: 3792,
          name: '2016-09-13T22:44:59.258Z',
        },
        {
          value: 3949,
          name: '2016-09-20T04:59:15.976Z',
        },
        {
          value: 5041,
          name: '2016-09-16T10:01:09.635Z',
        },
        {
          value: 6255,
          name: '2016-09-14T22:05:54.103Z',
        },
        {
          value: 4611,
          name: '2016-09-20T12:19:18.859Z',
        },
      ],
    },
    {
      name: 'Tokelau',
      series: [
        {
          value: 5091,
          name: '2016-09-13T22:44:59.258Z',
        },
        {
          value: 6731,
          name: '2016-09-20T04:59:15.976Z',
        },
        {
          value: 4568,
          name: '2016-09-16T10:01:09.635Z',
        },
        {
          value: 2884,
          name: '2016-09-14T22:05:54.103Z',
        },
        {
          value: 6433,
          name: '2016-09-20T12:19:18.859Z',
        },
      ],
    },
  ];

  constructor(private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getData();
    this.sharedService.Lang.subscribe((val) => {
      this.lang = val;
    });
  }
  dataToRender = [];
  chartrDataToRender = [];
  //data
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
        if (
          data[i].kpiTypeId == 5 ||
          data[i].kpiTypeId == 5 ||
          data[i].kpiTypeId == 6 ||
          data[i].kpiTypeId == 7 ||
          data[i].kpiTypeId == 8 ||
          data[i].kpiTypeId == 9
        ) {
          this.chartrDataToRender.push({
            name: data[i].name,
            brief: data[i].brief,
            readValue: data[i].readValue,
            orderIndex: data[i].orderIndex,
            color: data[i].color,
            readDate: data[i].readDate,
            kpiTypeId: data[i].kpiTypeId,
          });
        }
      }
      this.data = this.dataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
      this.chartData = this.chartrDataToRender.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    });
  }
}
