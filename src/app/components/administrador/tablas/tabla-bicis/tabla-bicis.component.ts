import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Usuario } from '../tabla-user/tabla-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CargaService } from '../../../../services/carga.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

export interface Bicicleta {
  id: number;
  nombre: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-tabla-bicis',
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './tabla-bicis.component.html',
  styleUrl: './tabla-bicis.component.css',
})
export class TablaBicisComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  // Modales
  @ViewChild('modalEditar', { static: false }) modalEditarRef!: ElementRef;
  @ViewChild('modalEliminar', { static: false }) modalEliminarRef!: ElementRef;
  @ViewChild('overlay', { static: false }) overlayRef!: ElementRef;

  constructor(
    private api: ApiService,
    private cargaService: CargaService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  cargando: boolean = true;
  bicis: Bicicleta[] = [];
  nuevoNombre: string = '';
  bicicletaSeleccionada: any = null;
  isLoading = false;
  errores: any = {};

  dataSource!: MatTableDataSource<Bicicleta>;
  displayedColumns: string[] = ['acciones', 'nombre', 'usuario'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    this.obtenerBicicletas();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  obtenerBicicletas() {
    this.api.get('admin/bicicletas').then((response) => {
      this.bicis = response.data;
      this.dataSource = new MatTableDataSource(this.bicis);
      this.cargaService.hide();
    });
  }

  openModalEditar(bicicleta: Bicicleta) {
    this.bicicletaSeleccionada = bicicleta;
    this.nuevoNombre = bicicleta.nombre;
    this.mostrarModal(this.modalEditarRef);
  }

  openModalEliminar(bicicleta: Bicicleta) {
    this.bicicletaSeleccionada = bicicleta;
    this.mostrarModal(this.modalEliminarRef);
  }

  mostrarModal(modalRef: ElementRef) {
    if (modalRef && this.overlayRef) {
      modalRef.nativeElement.style.display = 'flex';
      this.overlayRef.nativeElement.style.display = 'flex';
      this.cdr.detectChanges();
    }
  }

  cerrarModal() {
    if (this.modalEditarRef && this.modalEliminarRef && this.overlayRef) {
      this.modalEditarRef.nativeElement.style.display = 'none';
      this.modalEliminarRef.nativeElement.style.display = 'none';
      this.overlayRef.nativeElement.style.display = 'none';
    }
    this.bicicletaSeleccionada = null;
  }

  async editarBicicleta() {
    this.isLoading = true;
    this.errores = {};

    try {
      await this.api.put(`bicicleta/${this.bicicletaSeleccionada.id}`, {
        nombre: this.nuevoNombre,
      });
      this.bicicletaSeleccionada.nombre = this.nuevoNombre;
      this.toastr.success('Bicicleta actualizada correctamente.', '¡Éxito!');
      this.cerrarModal();
    } catch (error: any) {
      console.error('Error al editar bicicleta:', error);
      this.toastr.error('No se pudo actualizar la bicicleta.', 'Error');
      this.procesarErroresValidaciones(error);
    } finally {
      this.isLoading = false;
    }
  }

  // Eliminar bicicleta
  async eliminarBicicleta() {
    this.isLoading = true;

    try {
      await this.api.delete(`bicicleta/${this.bicicletaSeleccionada.id}`);
      this.bicis = this.bicis.filter(
        (bici) => bici.id !== this.bicicletaSeleccionada.id
      );
      this.toastr.success('Bicicleta eliminada correctamente.', '¡Éxito!');
      this.obtenerBicicletas();
      this.cerrarModal();
    } catch (error) {
      console.error('Error al eliminar bicicleta:', error);
      this.toastr.error('No se pudo eliminar la bicicleta.', 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  // Procesar errores del servidor
  procesarErroresValidaciones(error: any) {
    if (error && error.errores) {
      this.errores = error.errores;
    }
  }
}