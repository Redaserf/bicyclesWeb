import {AfterViewInit, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import * as AOS from 'aos';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { CanExit } from '../../../guards/form-register.guard'; 
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule,FontAwesomeModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit,CanExit{

  userObject: any = {
    nombre: '',
    apellido: '',
    peso: '',
    email: '',
    password: '',
  }

  confirm_password: string = '';
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

  save(){
    if (this.confirm_password === this.userObject.password) {
      console.log('Datos del usuario:', this.userObject);
      this.isFormDirty = false;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonColor: '#e83e8c'
      });
    }
  }
}
