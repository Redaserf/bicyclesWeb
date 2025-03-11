import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-user-perfil',
  imports: [],
  templateUrl: './user-perfil.component.html',
  styleUrl: './user-perfil.component.css'
})
export class UserPerfilComponent {
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
