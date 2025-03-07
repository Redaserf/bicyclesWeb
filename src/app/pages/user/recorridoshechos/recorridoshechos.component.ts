import { Component } from '@angular/core';
import AOS from 'aos';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-recorridoshechos',
  imports: [SidebarUserComponent],
  templateUrl: './recorridoshechos.component.html',
  styleUrl: './recorridoshechos.component.css'
})
export class RecorridoshechosComponent { ngOnInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
