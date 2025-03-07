import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-perfil-admin',
  imports: [],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {
  ngOnInit(): void {
    // Inicializar la animación AOS cuando se carga el componente
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
