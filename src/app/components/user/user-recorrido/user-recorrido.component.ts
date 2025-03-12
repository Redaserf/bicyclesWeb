import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-user-recorrido',
  imports: [],
  templateUrl: './user-recorrido.component.html',
  styleUrl: './user-recorrido.component.css'
})
export class UserRecorridoComponent {
  ngOnInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
