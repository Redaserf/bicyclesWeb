import { Component } from '@angular/core';
import AOS from 'aos';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-admin-estadisticas',
  imports: [],
  templateUrl: './admin-estadisticas.component.html',
  styleUrl: './admin-estadisticas.component.css'
})
export class AdminEstadisticasComponent {
  labels: string[] = [];
  data: number[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.crearGrafica();
        AOS.init({
          offset: 100,
          delay: 0,
          duration: 1000,
          easing: 'ease-in-out',
          once: false
        });
  }
    //   selectedFilter: string = 'week';
    // selectedTab: string = 'calories';
    // chart!: Chart;
  
    // data = {
    //   distance: { total: 50, best: 12, average: 8 },
    //   calories: { total: 3556, best: 615, average: 508 },
    //   duration: { total: 180, best: 50, average: 30 }
    // };
  
    // chartData = {
    //   week: [495, 375, 488, 487, 509],
    //   month: [1500, 1200, 1800, 1750, 1600],
    //   year: [20000, 18000, 22000, 19500, 21000]
    // };

    crearGrafica() {
      const ctx = document.getElementById('miGrafico') as HTMLCanvasElement;
      
      this.api.get('admin/recorridos/semana').then((response: any) => {
        console.log('Respuesta del backend:', response);
        if(response.status === 200) {
          //lo que puedo hacer es hacer un map por el response.data q deveulva el mes y el dia concatenado y otro map para la cantidad de recorridos
          
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: response.data.labels,
              datasets: [
                {
                  label: 'Recorridos',
                  data: response.data.data,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        
        }
      }).catch((error: any) => {
        console.error('Error al obtener los datos:', error);
      });

      this.labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
      console.log('Labels:', this.labels);
      console.log('Data:', this.data);

    }

}
