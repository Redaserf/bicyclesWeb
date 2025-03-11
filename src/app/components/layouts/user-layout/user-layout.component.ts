import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from '../../user/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, UserSidebarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
