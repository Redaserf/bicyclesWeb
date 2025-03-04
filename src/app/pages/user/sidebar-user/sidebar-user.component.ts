import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-user',
  imports: [NgClass],
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.css'
})
export class SidebarUserComponent {

  menuAbierto: boolean = false;

  toggleSidebar(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}
