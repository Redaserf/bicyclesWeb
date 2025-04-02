import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CargaService } from '../../../services/carga.service';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-user-recorrido-actual',
  imports: [NgIf],
  templateUrl: './user-recorrido-actual.component.html',
  styleUrls: ['./user-recorrido-actual.component.css']
})
export class UserRecorridoActualComponent implements OnInit {

  datos = {
    temperatura: 26,
    calorias: 180,
    distancia: 2.5,
    velocidadPromedio: 15.2,
    velocidadActual: 18.5,
    velocidadMaxima: 23.1
  };

  constructor(private apiService: ApiService, private cargaService: CargaService) {}

  tiempoRecorrido: string = '00:00:00';
  cargando: boolean = true;

  ngOnInit(): void {
    var mayonesa = localStorage.getItem('mayonesa');
    console.log('mayonesa: ' + mayonesa);

    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    // de mientras we
    setTimeout(() => {
      this.cargando = false;
      this.cargaService.hide();
      this.iniciarContador();
    }, 1000);
  }

  public async getDatos() {
    try {
      const response = await this.apiService.get('/rutaDeHugoXD');
      this.cargaService.hide();
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return { datos: [] };
    }
  }

  // estas van a ser las variables que van a contener los datos de la respuesta we xdxdxd
  iniciarContador() {
    let segundos = 0;
    setInterval(() => {
      segundos++;
      const h = Math.floor(segundos / 3600).toString().padStart(2, '0');
      const m = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
      const s = (segundos % 60).toString().padStart(2, '0');
      this.tiempoRecorrido = `${h}:${m}:${s}`;
    }, 1000);
  }
}
