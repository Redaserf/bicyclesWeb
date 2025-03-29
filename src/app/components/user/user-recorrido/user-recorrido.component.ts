import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CargaService } from '../../../services/carga.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user-recorrido',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './user-recorrido.component.html',
  styleUrl: './user-recorrido.component.css'
})
export class UserRecorridoComponent implements OnInit {

  isLoading = false;
  cargando: boolean = true;
  recorridos: any[] = [];
  recorridoSeleccionado: any = null;
  idRecorridoAEliminar: number | null = null;
  searchTerm: string = '';

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

    this.obtenerRecorridos();
  }

  public async getRecorridos() {
    try {
      const response = await this.apiService.get('/recorridos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener recorridos:', error);
      return { recorridos: [] };
    } finally {
      this.cargaService.hide();
    }
  }

  public async deleteRecorrido(id: number) {
    try {
      this.isLoading = true;
      await this.apiService.delete(`/recorrido/${id}`);
      this.recorridos = this.recorridos.filter(rec => rec.id !== id);
      this.cerrarModalEliminar();
      this.toastr.success('Recorrido eliminado correctamente.', '¡Éxito!');
    } catch (error) {
      console.error('Error al eliminar recorrido:', error);
      this.toastr.error('No se pudo eliminar el recorrido.', 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  obtenerRecorridos() {
    this.getRecorridos().then(data => {
      console.log("Recorridos obtenidos:", data.recorridos);
      this.recorridos = data.recorridos;
    }).catch(error => {
      console.error('Error al cargar recorridos:', error);
    });
  }  

  abrirModalDetalle(recorrido: any) {
    this.recorridoSeleccionado = recorrido;
    setTimeout(() => {
      document.getElementById('modalDetalle')?.classList.add('show');
    }, 0);
  }

  cerrarModalDetalle() {
    this.recorridoSeleccionado = null;
    document.getElementById('modalDetalle')?.classList.remove('show');
  }

  abrirModalEliminar(id: number) {
    this.idRecorridoAEliminar = id;
    setTimeout(() => {
      document.getElementById('modalEliminar')?.classList.add('show');
    }, 0);
  }

  cerrarModalEliminar() {
    this.idRecorridoAEliminar = null;
    document.getElementById('modalEliminar')?.classList.remove('show');
  }

  confirmarEliminar() {
    if (this.idRecorridoAEliminar !== null) {
      this.deleteRecorrido(this.idRecorridoAEliminar);
    }
  }

  get recorridosFiltrados() {
    if (!this.searchTerm.trim()) {
      return this.recorridos;
    }
  
    return this.recorridos.filter(recorrido => {
      return (
        (recorrido.bicicleta_nombre?.toLowerCase().includes(this.searchTerm.toLowerCase()) || "") ||
        (recorrido.created_at?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) || "") ||
        (recorrido.distancia_recorrida?.toString().includes(this.searchTerm) || "") ||
        (recorrido.tiempo ? recorrido.tiempo.toString().includes(this.searchTerm) : false)
      );
    });
  }
  
}
