import { Component } from '@angular/core';
import AOS from 'aos';
import { SidebarComponentUser } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-recorrido',
  imports: [SidebarComponentUser],
  templateUrl: './recorrido.component.html',
  styleUrl: './recorrido.component.css'
})
export class RecorridoComponent {

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
