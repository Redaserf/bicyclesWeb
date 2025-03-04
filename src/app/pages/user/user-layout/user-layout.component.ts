import { Component } from '@angular/core';
import { RecorridoComponent } from '../recorrido/recorrido.component';
import { RouterOutlet } from '@angular/router';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-user-layout',
  imports: [RecorridoComponent, RouterOutlet, SidebarUserComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
