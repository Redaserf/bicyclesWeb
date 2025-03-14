import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  imports: [NgClass, RouterLink],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  menuAbierto: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  toggleSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }

    logout(): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Tu sesión se cerrará y tendrás que iniciar sesión nuevamente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout()
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión correctamente.',
                confirmButtonColor: '#188AFF'
              }).then(() => {
                this.router.navigate(['/']);
              });
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.mensaje || 'No se pudo cerrar sesión.',
                confirmButtonColor: '#d33'
              });
            });
        }
      });
    }

}
