import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  
  pieChartLabels:string[];
  pieChartType:string = 'pie';
  @Input()countryName="";
  @Input()pieChartData:number[];

  constructor() { }

  ngOnInit() {
    this.pieChartLabels=['Confirmed', 'Active', 'Recovered','Deaths'];
  }

  pieChartColor:any = [
    {
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(0, 255, 0, 0.9)',
        'rgba(255, 0, 0, 0.9)',
        ]
    }
]

}
