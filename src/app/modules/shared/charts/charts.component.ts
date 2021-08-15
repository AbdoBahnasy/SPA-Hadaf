import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @Input('chartType') chartType;
  @Input('containerRef') containerRef;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  legendPosition: string = 'below';
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = false;
  fitContainer: any[] = [];
  fitContainer2: any[] = [];

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
          name: '2016-09-13',
        },
        {
          value: 5176,
          name: '2016-09-20',
        },
        {
          value: 6962,
          name: '2016-09-16',
        },
        {
          value: 3893,
          name: '2016-09-14',
        },
        {
          value: 3706,
          name: '2016-09-14',
        },
      ],
    },
    {
      name: 'Colombia',
      series: [
        {
          value: 2247,
          name: '2016-09-13',
        },
        {
          value: 5176,
          name: '2016-09-20',
        },
        {
          value: 6962,
          name: '2016-09-16',
        },
        {
          value: 3893,
          name: '2016-09-14',
        },
        {
          value: 3706,
          name: '2016-09-14',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.fitContainer = [
      this.containerRef.offsetWidth - 20,
      this.containerRef.offsetHeight - 40,
    ];
    this.fitContainer2 = [
      this.containerRef.offsetWidth - 30,
      this.containerRef.offsetHeight - 40,
    ];
  }
}
