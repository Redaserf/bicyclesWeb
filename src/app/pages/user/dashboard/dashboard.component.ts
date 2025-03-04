import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecorridoComponent } from '../recorrido/recorrido.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarUserComponent, RecorridoComponent, PerfilComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
