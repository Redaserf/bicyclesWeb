import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  peso: number;
  estatura: number;
}

@Component({
  selector: 'app-tabla-user',
  imports: [CommonModule, NgFor],
  templateUrl: './tabla-user.component.html',
  styleUrl: './tabla-user.component.css'
})
export class TablaUserComponent implements OnInit {

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  usuarios: Usuario[] = [];
  usuarioSeleccionado: any = null;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
    this.api.get('admin/usuarios').then((response: any) => {
      this.usuarios = response.data;
      console.log('usuarios', this.usuarios);
    }).catch((error: any) => {
      console.log('error todos los usuarios', error);
    });

  }

  openModal(usuario: Usuario) {
    // this.usuarioSeleccionado = usuario;
    this.modal.nativeElement.style.display = 'block';
    this.overlay.nativeElement.style.display = 'block';
    this.usuarioSeleccionado = usuario;

  }

  // Cierra el modal
  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.overlay.nativeElement.style.display = 'none';
    this.usuarioSeleccionado = null;
  }

  deleteUser() {
    if (!this.usuarioSeleccionado) return;

    this.api.delete(`usuario/${this.usuarioSeleccionado.id}`)
      .then(response => {
        
        if(response.status === 200) {
          const index = this.usuarios.findIndex(usuario => usuario.id === this.usuarioSeleccionado.id);
          this.usuarios.splice(index, 1);
  
          this.closeModal();
        }

      })
      .catch(error => {
        console.error('Error al eliminar usuario:', error);
        
      });
  }

  editarUsuario(usuario: Usuario) {
  
    this.router.navigate(['/admin/usuario/editar', usuario.id]);
    
  }

}
