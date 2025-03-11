import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
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
}
