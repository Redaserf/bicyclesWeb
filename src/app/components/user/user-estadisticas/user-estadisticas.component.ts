import { Component } from '@angular/core';
import AOS from 'aos';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../services/api-service.service';
import { CargaService } from '../../../services/carga.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-estadisticas',
  imports: [NgIf],
  templateUrl: './user-estadisticas.component.html',
  styleUrl: './user-estadisticas.component.css'
})
export class UserEstadisticasComponent {

  cargando: boolean = false;
  constructor(private api: ApiService, private cargaService: CargaService) { }

  ngOnInit(): void {

    this.cargaService.show()
    this.cargaService.cargando$.subscribe((cargando: boolean) => {
      this.cargando = cargando;
    });

        AOS.init({
          offset: 100,
          delay: 0,
          duration: 1000,
          easing: 'ease-in-out',
          once: false
        });

        this.crearGrafica();
  }
    selectedFilter: string = 'week';
    selectedTab: string = 'calorias';
    chart!: Chart;
    generales!: any;
    chartData!: any;



    crearGrafica(tab: string = 'calorias') {
      this.selectedTab = tab;
      const ctx = document.getElementById('miGrafico') as HTMLCanvasElement;
    
      // Si ya existe una gráfica previa, la destruimos para no superponer
      if (this.chart) {
        this.chart.data.datasets[0].data = this.chartData[tab];
        this.chart.data.datasets[0].label = tab;
        this.chart.update();
      }else{
          this.api.get('semana/estadisticas').then((response: any) => {
            if (response.status === 200) {
              this.generales = response.data.generales;
                
              this.chartData = response.data.data;
    
              this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: response.data.labels,
                  datasets: [
                    {
                      label: `${tab}`,
                      data: response.data.data[tab],
                      borderWidth: 1
                    }
                  ]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }
              });

              this.cargaService.hide()
            }
          }).catch((error: any) => {
            console.error('Error al obtener los datos:', error);
            this.cargaService.hide()
          });
      }

    }
    
  cambiarTab(tab: string) {
    this.selectedTab = tab;
    this.crearGrafica();
  }


}
