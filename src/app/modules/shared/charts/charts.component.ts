import { AfterViewChecked, Component, Input, OnChanges, OnInit } from '@angular/core';
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
    this.chartdata = [];
    this.getData();
  }

  getData() {
    
    if (this.chartType == 5) {
      this.chartdata.push({
        name: this.chartName,
        series: this.data.map((d) => {
          return { name: d.key, value: d.value };
        }),
      });
    } else {
      for (let i = 0; i < this.data.length; i++) {
        this.chartdata.push({
          name: this.data[i].key,
          value: this.data[i].value,
        });
      }
    }
  }
}
