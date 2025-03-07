import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-homeuser',
  imports: [],
  templateUrl: './homeuser.component.html',
  styleUrl: './homeuser.component.css'
})
export class HomeuserComponent {
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
