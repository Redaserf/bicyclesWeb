import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../administrador/admin-sidebar/admin-sidebar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebarComponent, MatProgressBarModule, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  cargandoVar: boolean = true;

  cargando() {
    //aqui se pondra la pantalla de carga o se cambiara propiedad de el componente de carga
    this.cargandoVar = true;
  }
}
