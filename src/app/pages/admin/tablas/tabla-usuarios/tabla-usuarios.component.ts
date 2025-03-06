import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [CommonModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})
export class TablaUsuariosComponent {
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  openModal() {
    // this.usuarioSeleccionado = usuario;
    this.modal.nativeElement.style.display = 'block';
    this.overlay.nativeElement.style.display = 'block';
  }

    // Cierra el modal
    closeModal() {
      this.modal.nativeElement.style.display = 'none';
      this.overlay.nativeElement.style.display = 'none';
    }

    deleteUser() {

    }
}
