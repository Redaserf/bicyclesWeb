import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//componentes
import { LogoComponent } from "../../all/logo/logo.component";
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
