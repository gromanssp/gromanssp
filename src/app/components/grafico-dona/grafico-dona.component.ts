import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: true,
  // imports: [BaseChartDirective],
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  providers: []
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
