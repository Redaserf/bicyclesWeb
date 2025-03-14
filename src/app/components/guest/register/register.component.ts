import { AfterViewInit, Component } from '@angular/core';
import { CanExit } from '../../../guards/form-register.guard';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { faEye, 
  faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth-service.service';
import { CommonModule } from '@angular/common';
  
@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements AfterViewInit, CanExit {
  nombre: string = '';
  apellido: string = '';
  peso: number = 0.00;
  estatura: number = 0.00;
  email: string = '';
  password: string = '';

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  verPassword: boolean = false;
  isLoading: boolean = false;
  success_message: string = '';
  confirm_password: string = '';
  isFormDirty: boolean = false;
  erroresValidacion: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  // =====[AOS Y ExitGuard]=====

  ngAfterViewInit(): void {
    this.erroresValidacion = {};
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

  // =====[Fin de AOS Y ExitGuard]=====

  async onRegister() {
    try {
      this.erroresValidacion = {};
      this.isLoading = true;
  
      if (!this.nombre || !this.apellido || !this.peso || !this.estatura || !this.email || !this.password) {
        this.erroresValidacion.mensaje = 'Todos los campos son obligatorios.';
        return;
      }
  
      console.log('Antes de llamar a AuthService.register');
  
      await this.authService.register(
        this.nombre, this.apellido, this.peso, this.estatura, this.email, this.password
      );
  
      console.log('Registro exitoso');
  
      this.success_message = 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.';
      this.router.navigate(['/auth/code-verification'], { queryParams: { email: this.email, registered: 'true' } });
  
    } catch (error: any) {
      console.error('Error en el registro:', error);
  
      console.log('Datos del error en onRegister:', error);
  
      if (error.errores) {
        console.log('Errores de validación:', error.errores);
        this.erroresValidacion = error.errores;
      } else if (error.mensaje) {
        console.log('Mensaje de error:', error.mensaje);
        this.erroresValidacion = error.mensaje;
      } else {
        console.log('Error inesperado:', error);
        this.erroresValidacion = 'Ocurrió un error inesperado.';
      }
    } finally {
      this.isLoading = false;
    }
  }
  
  
  
}