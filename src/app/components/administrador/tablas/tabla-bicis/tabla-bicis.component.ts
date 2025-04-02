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
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CargaService } from '../../../../services/carga.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface Bicicleta {
  id: number;
  nombre: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-tabla-bicis',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './tabla-bicis.component.html',
  styleUrl: './tabla-bicis.component.css',
})
export class TablaBicisComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild('modalEditar', { static: false }) modalEditarRef!: ElementRef;
  @ViewChild('modalEliminar', { static: false }) modalEliminarRef!: ElementRef;
  @ViewChild('overlay', { static: false }) overlayRef!: ElementRef;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cargando: boolean = true;
  bicis: Bicicleta[] = [];
  dataSource!: MatTableDataSource<Bicicleta>;
  displayedColumns: string[] = ['acciones', 'nombre', 'usuario'];

  // Paginación
  length = 0;
  pageSize = 8;
  pageIndex = 0;

  nuevoNombre: string = '';
  bicicletaSeleccionada: any = null;
  isLoading = false;
  errores: any = {};

  constructor(
    private api: ApiService,
    private cargaService: CargaService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

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

  obtenerBicicletas(page: number = 1, perPage: number = this.pageSize) {
    this.api.get(`admin/bicicletas?page=${page}&per_page=${perPage}`).then((response) => {
      const paginated = response.data;
      this.bicis = paginated.data;

      this.dataSource = new MatTableDataSource(this.bicis);
      this.dataSource.sort = this.sort;

      // Paginación
      this.length = paginated.total;
      this.pageSize = paginated.per_page;
      this.pageIndex = paginated.current_page - 1;

      this.cargaService.hide();
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.obtenerBicicletas(event.pageIndex + 1, this.pageSize);
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
    this.modalEditarRef.nativeElement.style.display = 'none';
    this.modalEliminarRef.nativeElement.style.display = 'none';
    this.overlayRef.nativeElement.style.display = 'none';
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
      this.toastr.error('No se pudo actualizar la bicicleta.', 'Error');
      this.procesarErroresValidaciones(error);
    } finally {
      this.isLoading = false;
    }
  }

  async eliminarBicicleta() {
    this.isLoading = true;
    try {
      await this.api.delete(`bicicleta/${this.bicicletaSeleccionada.id}`);
      this.toastr.success('Bicicleta eliminada correctamente.', '¡Éxito!');
      this.obtenerBicicletas(this.pageIndex + 1, this.pageSize);
      this.cerrarModal();
    } catch (error) {
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
