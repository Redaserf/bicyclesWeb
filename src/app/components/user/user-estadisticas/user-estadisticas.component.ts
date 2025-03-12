import { Component } from '@angular/core';
import AOS from 'aos';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-estadisticas',
  imports: [],
  templateUrl: './user-estadisticas.component.html',
  styleUrl: './user-estadisticas.component.css'
})
export class UserEstadisticasComponent {
  ngOnInit(): void {
        AOS.init({
          offset: 100,
          delay: 0,
          duration: 1000,
          easing: 'ease-in-out',
          once: false
        });
      }
      selectedFilter: string = 'week';
    selectedTab: string = 'calories';
    chart!: Chart;

    data = {
      distance: { total: 50, best: 12, average: 8 },
      calories: { total: 3556, best: 615, average: 508 },
      duration: { total: 180, best: 50, average: 30 }
    };

    chartData = {
      week: [495, 375, 488, 487, 509],
      month: [1500, 1200, 1800, 1750, 1600],
      year: [20000, 18000, 22000, 19500, 21000]
    };
}
