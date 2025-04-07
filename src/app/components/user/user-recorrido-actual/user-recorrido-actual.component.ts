import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CargaService } from '../../../services/carga.service';
import { ApiService } from '../../../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recorrido-actual',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-recorrido-actual.component.html',
  styleUrls: ['./user-recorrido-actual.component.css']
})
export class UserRecorridoActualComponent implements OnInit, OnDestroy {

  datos = {
    temperatura: 0,
    calorias: 0,
    distancia: 0,
    velocidadPromedio: 0,
    velocidadActual: 0,
    velocidadMaxima: 0
  };

  tiempoRecorrido: string = '00:00:00';
  cargando: boolean = true;
  pollingInterval: any;

  constructor(private apiService: ApiService, private cargaService: CargaService, private router: Router) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    this.getDatos();
    this.startPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
  }

  public async getDatos() {
    try {
      const response = await this.apiService.get('/recorrido-activo');
      const r = response?.data?.recorrido;
  
      if (r) {
        this.tiempoRecorrido = r.tiempo || '00:00:00';
        this.datos = {
          temperatura: r.temperatura || 0,
          calorias: r.calorias || 0,
          distancia: r.distancia_recorrida || 0,
          velocidadPromedio: r.velocidad_promedio || 0,
          velocidadActual: r.velocidad || 0,
          velocidadMaxima: r.velocidad_maxima || 0
        };
  
        if (r.acabado === true && this.pollingInterval) {
          clearInterval(this.pollingInterval);
          this.pollingInterval = null;
          this.router.navigate(['/user/recorridos']);
        }
      }
  
      this.cargaService.hide();
    } catch (error: any) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;
    
      if (status === 404 || msg === 'No hay recorrido activo') {
        if (this.pollingInterval) {
          clearInterval(this.pollingInterval);
          this.pollingInterval = null;
        }
        this.router.navigate(['/user/recorridos']);
      } else {
        console.error('Error al obtener recorrido activo:', error);
      }
    }    
  }  

  startPolling() {
    this.pollingInterval = setInterval(() => {
      this.getDatos();
    }, 5000);
  }
}