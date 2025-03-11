import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-admin-perfil',
  imports: [],
  templateUrl: './admin-perfil.component.html',
  styleUrl: './admin-perfil.component.css'
})
export class AdminPerfilComponent {
  ngOnInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
