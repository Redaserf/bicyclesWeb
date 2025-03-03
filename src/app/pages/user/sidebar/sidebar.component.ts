import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebarGuest',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponentUser {
  menuAbierto: boolean = false;

  toggleSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}
