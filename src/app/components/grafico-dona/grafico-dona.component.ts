import { Component, OnInit, Input } from '@angular/core';
// import { ChartType } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { BaseChartDirective } from 'ng2-charts';

@Component({
  standalone: true,
  // imports: [BaseChartDirective],
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  providers: [provideCharts(withDefaultRegisterables())]
})
export class GraficoDonaComponent implements OnInit {
  // Doughnut
  @Input('chartLabels') public doughnutChartLabels: any[] = [];
  @Input('chartData') public doughnutChartData: any = [];
  @Input('chartType') public doughnutChartType: String = 'doughnut';

  constructor() {
   }

  ngOnInit() {
  }

}
