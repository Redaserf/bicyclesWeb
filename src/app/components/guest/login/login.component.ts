import { AfterViewInit, Component } from '@angular/core';
import { CanExit } from '../../../guards/form-login.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit, CanExit {
  faUser = faUser;
  faKey = faKey;
  username: string = '';
  password: string = '';
  isFormDirty: boolean = false;

  ngAfterViewInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }

  canExit(): Observable<boolean> {
    if (!this.isFormDirty) {
      return new Observable<boolean>((observer) => {
        observer.next(true);
        observer.complete();
      });
    }

    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: '¿Estás seguro que quieres salir?',
        text: 'Tienes cambios sin guardar.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar',
        background: '#fff',
        customClass: {
          popup: 'custom-swal-popup'
        }
      }).then((result) => {
        observer.next(result.isConfirmed);
        observer.complete();
      });
    });
  }

  onInputChange() {
    this.isFormDirty = true; 
  }

  onSubmit() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    this.isFormDirty = false; 
  }
}
