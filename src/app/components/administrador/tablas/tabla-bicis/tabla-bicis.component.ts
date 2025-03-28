import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Usuario } from '../tabla-user/tabla-user.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CargaService } from '../../../../services/carga.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


export interface Bicicleta {
  id: number;
  nombre: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-tabla-bicis',
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './tabla-bicis.component.html',
  styleUrl: './tabla-bicis.component.css'
})
export class TablaBicisComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild('modal', { static: false }) modal!: ElementRef;
  @ViewChild('overlay', { static: false }) overlay!: ElementRef;



  
  constructor(private api: ApiService, private cargaService: CargaService) {}
  
  bicis: Bicicleta[] = [
    { id: 1, nombre: 'Bici 1', usuario: { id: 1, nombre: 'Usuario 1', apellido: "@", email: "emauil", peso: 89, estatura: 1.90  } },
  ];
  nuevoNombre: string = '';
  biciSeleccionada: any = null;
  cargando: boolean = true;
  
  dataSource!: MatTableDataSource<Bicicleta>;
  displayedColumns: string[] = ['acciones', 'nombre', 'usuario'];
  
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;//aqui se cambia el estado cuando cambia el estado
    });

    this.api.get('admin/bicicletas').then((response) => {
      this.bicis = response.data;
      this.dataSource = new MatTableDataSource(this.bicis);
      this.cargaService.hide();
      console.log(this.bicis);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // Asegura que modal y overlay estén disponibles
    if (!this.modal || !this.overlay) {
      console.error('No se pudo acceder a los elementos del modal.');
    }
  }

  aplicarFiltro(event: any) {

    
    
  }

  // Abre el modal y carga la bicicleta seleccionada
  openModal(bicicleta: Bicicleta) {
    if (!this.modal || !this.overlay) {
      console.error('No se pudo acceder al modal o al overlay.');
      return;
    }

    this.modal.nativeElement.style.display = 'block';
    this.overlay.nativeElement.style.display = 'block';
    this.biciSeleccionada = bicicleta;
    this.nuevoNombre = bicicleta.nombre;
  }


  closeModal() {
    if (!this.modal || !this.overlay) return;

    this.modal.nativeElement.style.display = 'none';
    this.overlay.nativeElement.style.display = 'none';
    this.biciSeleccionada = null;
  }

  actualizarNombre() {
    this.api
      .post('bicicleta/' + this.biciSeleccionada.id, {
        nombre: this.nuevoNombre
      })
      .then((response) => {
        if(response.status === 200) {

          console.debug('Se edito la bicicleta correctamente');
          this.biciSeleccionada.nombre = this.nuevoNombre;
          this.closeModal();

        }
      });
  }


  eliminarBici(bicicleta: Bicicleta) {
    this.api.delete('bicicleta/' + bicicleta.id).then((response) => {
      if(response.status === 200) {
        console.debug('Se elimino la bicicleta correctamente');
        this.bicis = this.bicis.filter((bici) => bici.id !== bicicleta.id);
      }
    });
  }

}
