import { Component, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  faUser = faUser;
  faKey = faKey;
  username: string = '';
  password: string = '';

  ngAfterViewInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }

  onSubmit() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
}
