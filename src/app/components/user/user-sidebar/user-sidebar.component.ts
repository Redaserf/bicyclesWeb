import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  imports: [NgClass, RouterLink],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  menuAbierto: boolean = false;

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

}
