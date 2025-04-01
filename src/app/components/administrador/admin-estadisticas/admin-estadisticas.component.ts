import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../services/api-service.service';
import { CargaService } from '../../../services/carga.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-estadisticas',
  imports: [NgIf],
  templateUrl: './admin-estadisticas.component.html',
  styleUrl: './admin-estadisticas.component.css'
})
export class AdminEstadisticasComponent implements OnInit{
  labels: string[] = [];
  data: number[] = [];
  cargando: boolean = true;

  constructor(private api: ApiService, private cargaService: CargaService) { }

  ngOnInit(): void {
    this.cargaService.show();
    
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;//aqui se cambia el estado cuando cambia el estado
    });

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
      this.cargaService.show();
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

        this.cargaService.hide();
      }).catch((error: any) => {
        console.error('Error al obtener los datos:', error);
        this.cargaService.hide();
      });

    }

}
