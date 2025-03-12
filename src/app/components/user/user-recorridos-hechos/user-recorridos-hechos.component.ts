import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-user-recorridos-hechos',
  imports: [],
  templateUrl: './user-recorridos-hechos.component.html',
  styleUrl: './user-recorridos-hechos.component.css'
})
export class UserRecorridoshechosComponent { ngOnInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
