import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { CargaService } from '../../../../services/carga.service';

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
  imports: [CommonModule, CommonModule],
  templateUrl: './tabla-user.component.html',
  styleUrl: './tabla-user.component.css'
})
export class TablaUserComponent implements OnInit {

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  usuarios: Usuario[] = [];
  usuarioSeleccionado: any = null;
  cargando: boolean = true;

  constructor(private api: ApiService, private router: Router, private cargaService: CargaService) { }

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;//aqui se cambia el estado cuando cambia el estado
    });
    
    this.api.get('admin/usuarios').then((response: any) => {
      this.usuarios = response.data;
      console.log('usuarios', this.usuarios);
      this.cargaService.hide();
    }).catch((error: any) => {
      console.log('error todos los usuarios', error);
      this.cargaService.hide();
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
