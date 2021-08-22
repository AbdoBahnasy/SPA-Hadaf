import { Component, Input, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @Input('chartType') chartType;
  @Input('containerRef') containerRef;
  @Input('data') data;
  @Input('chartName') chartName;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  legendPosition: string = 'below';
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = false;
  fitContainer: any[] = [];
  fitContainer2: any[] = [];
  chartdata = [];
  timeline = false;
  fake = [
    {
      name: 'green',
      series: [
        {
          name: 'Aug',
          value: 14,
        },
        {
          name: 'Sep',
          value: 35,
        },
        {
          name: 'Oct',
          value: 4,
        },
        {
          name: 'Nov',
          value: 17,
        },
        {
          name: 'Dec',
          value: 14,
        },
        {
          name: 'Jan',
          value: 35,
        },
      ],
    },

    {
      name: 'yellow',
      series: [
        {
          name: 'Aug',
          value: 364,
        },
        {
          name: 'Sep',
          value: 412,
        },
        {
          name: 'Oct',
          value: 437,
        },
        {
          name: 'Nov',
          value: 437,
        },
        {
          name: 'Dec',
          value: 364,
        },
        {
          name: 'Jan',
          value: 412,
        },
      ],
    },
    {
      name: 'red',
      series: [
        {
          name: 'Aug',
          value: 168,
        },
        {
          name: 'Sep',
          value: 343,
        },
        {
          name: 'Oct',
          value: 512,
        },
        {
          name: 'Nov',
          value: 291,
        },
        {
          name: 'Dec',
          value: 168,
        },
        {
          name: 'Jan',
          value: 343,
        },
      ],
    },
  ];
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  showLabels = false;

  constructor(private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.fitContainer = [
      this.containerRef.offsetWidth - 20,
      this.containerRef.offsetHeight - 40,
    ];
    this.fitContainer2 = [
      this.containerRef.offsetWidth - 30,
      this.containerRef.offsetHeight - 40,
    ];

    this.getData();
  }
  getData() {
    if (this.chartType == 5) {
      this.chartdata = [];
      for (let i = 0; i < this.data.length; i++) {
        this.chartdata.push({
          name: this.chartName,
          series: this.data[i].map((d) => {
            return { name: d.key, value: d.value };
          }),
        });
      }
    } else {
      this.chartdata = [];
      for (let i = 0; i < this.data.length; i++) {
        this.chartdata.push({
          name: this.data[i].key,
          value: this.data[i].value,
        });
      }
    }
  }
}
