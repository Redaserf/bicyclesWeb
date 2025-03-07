import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  menuAbierto: boolean = false;

  toggleSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}
