import { Component } from '@angular/core';
import { RecorridoComponent } from '../recorrido/recorrido.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponentUser } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-user-layout',
  imports: [RecorridoComponent, RouterOutlet, SidebarComponentUser],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
