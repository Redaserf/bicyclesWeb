import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Usuario } from '../tabla-user/tabla-user.component';
import { NgFor } from '@angular/common';
import { FormsModule} from '@angular/forms';

export interface Bicicleta {
  id: number;
  nombre: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-tabla-bicis',
  imports: [NgFor, FormsModule],
  templateUrl: './tabla-bicis.component.html',
  styleUrl: './tabla-bicis.component.css'
})
export class TablaBicisComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  @ViewChild('overlay', { static: false }) overlay!: ElementRef;


  constructor(private api: ApiService) {}

  bicis: Bicicleta[] = [];
  nuevoNombre: string = '';
  biciSeleccionada: any = null;

  ngOnInit(): void {
    this.api.get('admin/bicicletas').then((response) => {
      this.bicis = response.data;

      console.log(this.bicis);
    });
  }

  ngAfterViewInit(): void {
    // Asegura que modal y overlay estén disponibles
    if (!this.modal || !this.overlay) {
      console.error('No se pudo acceder a los elementos del modal.');
    }
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
