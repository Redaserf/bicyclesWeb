import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [NgClass, RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  menuAbierto: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarSideBar(): void {
    this.menuAbierto = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    
    const sidebar = document.getElementById('mainNav');
    const toggleButton = document.getElementById('toggleMenu');
    
    if (
      sidebar && 
      toggleButton && 
      !sidebar.contains(event.target as Node) && 
      !toggleButton.contains(event.target as Node)
    ) {
      this.cerrarSideBar();
    }
  
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
