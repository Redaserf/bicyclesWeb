import { Component } from '@angular/core';
import * as AOS from 'aos';

// declare const AOS: any;

@Component({
  selector: 'app-guest-layout',
  imports: [],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css'
})
export class GuestLayoutComponent {
  ngAfterViewInit(): void {
    // Inicializa AOS si está disponible
    if (typeof AOS !== 'undefined') {
      AOS.init({
        offset: 100,       // Desplazamiento desde el top de la página en px
        delay: 0,          // Tiempo de espera antes de la animación en ms
        duration: 1000,    // Duración de la animación en ms
        easing: 'ease-in-out', // Función de tiempo para la animación
        once: false        // La animación puede ocurrir más de una vez
      });
    }

    // Asegura que la página se cargue desde arriba
    window.scrollTo(0, 0);

    // Selecciona los elementos del DOM
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = document.querySelector('.search-icon');
    // Especificamos que searchInput es un HTMLElement para acceder a sus propiedades
    const searchInput = document.querySelector('.search-input') as HTMLElement | null;

    if (searchBar && searchIcon && searchInput) {
      // Al hacer clic en el ícono, se alterna la clase 'active' del searchBar
      searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
          searchInput.style.display = 'inline-block';
          searchInput.focus();
        } else {
          searchInput.style.display = 'none';
        }
      });

      // Al perder el foco, se oculta el searchBar
      searchInput.addEventListener('blur', () => {
        searchBar.classList.remove('active');
        searchInput.style.display = 'none';
      });
    }
  }
}
