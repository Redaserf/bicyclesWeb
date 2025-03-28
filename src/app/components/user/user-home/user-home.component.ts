import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, NgIf],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  datos: any = {};
  cargando: boolean = true;

  constructor(private apiService: ApiService, private cargaService: CargaService) {}

  ngOnInit(): void {

    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });

    this.obtenerDatos();
  }

  public async getDatos() {
    try {
      const response = await this.apiService.get('/resumen/usuario');
      this.cargaService.hide();
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return { datos: [] };
    }
  }

  obtenerDatos() {
    this.getDatos().then(data => {
      this.datos = data;
    }).catch(error => {
      console.error('Error al cargar datos:', error);
    });
  }
}