import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../administrador/tablas/tabla-user/tabla-user.component';
import { ToastrService } from 'ngx-toastr';
import { CargaService } from '../../../services/carga.service';
declare var bootstrap: any;

export interface Bicicleta {
  id: number;
  nombre: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-user-bicicletas',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './user-bicicletas.component.html',
  styleUrl: './user-bicicletas.component.css'
})

export class UserBicicletasComponent implements OnInit {
  @ViewChild('modalAgregar', { static: false }) modalAgregarRef!: ElementRef;
  @ViewChild('modalEditar', { static: false }) modalEditarRef!: ElementRef;
  @ViewChild('modalEliminar', { static: false }) modalEliminarRef!: ElementRef;
  @ViewChild('overlay', { static: false }) overlayRef!: ElementRef;  

  cargando: boolean = true;
  bicicletas: Bicicleta[] = [];
  bicicletaSeleccionada: any = null;
  nuevoNombre: string = '';
  nuevaBici: string = '';
  isLoading = false;
  errores: any = {};

  constructor(private apiService: ApiService, private toastr: ToastrService, private cargaService: CargaService) {}

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

    this.getBicicletas();

  }

  public async getBicicletas() {
    try {
      const response = await this.apiService.get('/bicicleta');
      this.bicicletas = response.data.data;
      console.log('Bicicletas del usuario:', this.bicicletas);
    } catch (error) {
      console.error('Error al obtener bicicletas:', error);
      this.bicicletas = [];
    } finally {
      this.cargaService.hide();
    }
  }
  
  openModalAgregar() {
    if (!this.modalAgregarRef || !this.overlayRef) {
      console.error('No se pudo acceder al modal o al overlay.');
      return;
    }

    this.modalAgregarRef.nativeElement.style.display = 'flex';
    this.overlayRef.nativeElement.style.display = 'flex';
  }

  openModalEditar(bicicleta: Bicicleta) {
    if (!this.modalEditarRef || !this.overlayRef) {
      console.error('No se pudo acceder al modal o al overlay.');
      return;
    }
  
    this.bicicletaSeleccionada = bicicleta;
    this.nuevoNombre = bicicleta.nombre;
  
    this.modalEditarRef.nativeElement.style.display = 'flex';
    this.overlayRef.nativeElement.style.display = 'flex';
  }

  openModalEliminar(bicicleta: Bicicleta) {
    if (!this.modalEliminarRef || !this.overlayRef) {
      console.error('No se pudo acceder al modal o al overlay.');
      return;
    }

    this.modalEliminarRef.nativeElement.style.display = 'flex';
    this.overlayRef.nativeElement.style.display = 'flex';
    this.bicicletaSeleccionada = bicicleta;
  }
  
  cerrarModal() {
    this.errores = {};
    this.isLoading = false;

    this.modalAgregarRef.nativeElement.style.display = 'none';
    this.modalEditarRef.nativeElement.style.display = 'none';
    this.modalEliminarRef.nativeElement.style.display = 'none';
    this.overlayRef.nativeElement.style.display = 'none';
  
    this.bicicletaSeleccionada = null;
  }  

  async agregarBicicleta() {
    this.isLoading = true;
    this.errores = {};
  
    try {
      const response = await this.apiService.post('bicicleta', {
        nombre: this.nuevaBici
      });
  
      this.bicicletas.push(response.data.bicicleta);
      this.nuevaBici = '';
      this.cerrarModal();
      this.toastr.success('Bicicleta agregada correctamente.', '¡Éxito!');
    } catch (error: any) {
      console.error('Error al agregar bicicleta:', error);
      this.procesarErroresValidaciones(error);
      this.toastr.error('No se pudo agregar la bicicleta.', 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  async editarBicicleta() {
    this.isLoading = true;
    this.errores = {};
  
    try {
      await this.apiService.put(`bicicleta/${this.bicicletaSeleccionada.id}`, {
        nombre: this.nuevoNombre
      });
  
      this.getBicicletas();
      setTimeout(() => {
        this.toastr.success('Bicicleta actualizada correctamente.', '¡Éxito!');
        this.cerrarModal();
      }, 600);

    } catch (error: any) {
      console.error('Error al editar bicicleta:', error);
      this.procesarErroresValidaciones(error);
      this.toastr.error('No se pudo actualizar la bicicleta.', 'Error');

    } finally {
      // this.isLoading = false;
    }
  }
  
  async eliminarBicicleta() {
    this.isLoading = true;

    try {
      await this.apiService.delete(`bicicleta/${this.bicicletaSeleccionada.id}`);
      this.bicicletas = this.bicicletas.filter(bici => bici.id !== this.bicicletaSeleccionada.id);
      this.getBicicletas();
      this.cerrarModal();
      this.toastr.success('Bicicleta eliminada correctamente.', '¡Éxito!');

    } catch (error) {
      console.error('Error al eliminar bicicleta:', error);
      this.toastr.error('No se pudo eliminar la bicicleta.', 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  procesarErroresValidaciones(error: any) {
    if (error && error.errores) {
      this.errores = error.errores;
    }
  }
  
}
