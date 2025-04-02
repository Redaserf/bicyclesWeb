import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { CargaService } from '../../../../services/carga.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule, NgFor } from '@angular/common';

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
  imports: [CommonModule, NgFor, MatPaginator],
  templateUrl: './tabla-user.component.html',
  styleUrl: './tabla-user.component.css'
})
export class TablaUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;

  pageSize = 8;
  pageIndex = 0;
  length = 0;

  cargando = true;
  isLoading = false;

  constructor(private api: ApiService, private router: Router, private cargaService: CargaService) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe(c => this.cargando = c);
    this.obtenerUsuarios();
  }

  async obtenerUsuarios(page: number = 1, perPage: number = this.pageSize) {
    try {
      const res = await this.api.get(`admin/usuarios?page=${page}&per_page=${perPage}`);
      this.usuarios = res.data.data;
      this.length = res.data.total;
      this.pageIndex = res.data.current_page - 1;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      this.cargaService.hide();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.obtenerUsuarios(event.pageIndex + 1, this.pageSize);
  }

  openModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.modal.nativeElement.style.display = 'block';
    this.overlay.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.usuarioSeleccionado = null;
    this.modal.nativeElement.style.display = 'none';
    this.overlay.nativeElement.style.display = 'none';
  }

  deleteUser() {
    if (!this.usuarioSeleccionado) return;

    this.api.delete(`usuario/${this.usuarioSeleccionado.id}`)
      .then(response => {
        if (response.status === 200) {
          this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioSeleccionado?.id);
          this.closeModal();
        }
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate(['/admin/usuario/editar', usuario.id]);
  }
}
