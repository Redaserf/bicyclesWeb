import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth-service.service';
import Pusher  from 'pusher-js';

@Component({
  selector: 'app-user-sidebar',
  imports: [NgClass, RouterLink, NgIf],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit {
  menuAbierto: boolean = false;
  hayRecorridoActivo: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
    Pusher.logToConsole = true;

    var pusher = new Pusher('2552bfa49fa7687c7c80', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('recorrido_' + localStorage.getItem('mayonesa'));
    channel.bind('RecorridoActivo', (data: any) => {
      console.log('Recorrido activo: ', data.recorridoActivo);
      this.hayRecorridoActivo = data.recorridoActivo;
    });

  }
  
  toggleSidebar(): void {
    setTimeout(() => {
      this.menuAbierto = !this.menuAbierto;
    }, 10);
  }

  cerrarSideBar(): void {
    setTimeout(() => {
      this.menuAbierto = false;
    }, 1);
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
