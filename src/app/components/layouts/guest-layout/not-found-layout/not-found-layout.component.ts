import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../global/logo/logo.component';
import { NotFoundComponent } from '../../../global/not-found/not-found.component';

@Component({
  selector: 'app-not-found-layout',
  imports: [NotFoundComponent, LogoComponent],
  templateUrl: './not-found-layout.component.html',
  styleUrl: './not-found-layout.component.css'
})
export class NotFoundLayoutComponent {

}
