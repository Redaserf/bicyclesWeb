import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import * as AOS from 'aos';
import { LogoComponent } from '../../global/logo/logo.component';
import { RouterLink } from '@angular/router';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-guest-home',
  imports: [LogoComponent, RouterLink, NgFor],
  templateUrl: './guest-home.component.html',
  styleUrl: './guest-home.component.css'
})
export class GuestHomeComponent implements OnInit {

  cargando: boolean = true;

  constructor(private cargaService: CargaService) { }

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });
  }

  ngAfterViewInit(): void {
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

    setTimeout(() => {
      this.cargaService.hide();
    }, 1100);

  }

  //opciones Array
   opcionesSeguimiento = [
    {nombre: "Iniciar Sesión", ruta: "/auth/login"},
    {nombre: "Registrarse", ruta: "/auth/register"},
    {nombre: "Informacion", ruta: "/info"},
    // {nombre: "Descargar-App", ruta: "#"},
    // {nombre: "Contactanos", ruta: "/home#"},

  ];
}
