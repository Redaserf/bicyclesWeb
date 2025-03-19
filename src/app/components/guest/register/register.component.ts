import { AfterViewInit, Component } from '@angular/core';
import { CanExit } from '../../../guards/form-register.guard';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
  peso: number | null = null;
  estatura: number | null = null;
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  verPassword: boolean = false;
  isLoading: boolean = false;
  erroresValidacion: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  // Inicialización de AOS para animaciones
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

  // Protección de salida si hay cambios no guardados
  canExit(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      observer.next(true);
      observer.complete();
    });
  }

  async onRegister() {
    try {
      this.erroresValidacion = {}; // Resetear errores
      this.isLoading = true;

    if (this.password !== this.confirm_password) {
      this.erroresValidacion.password = ['Las contraseñas no coinciden.'];
      this.isLoading = false;
      return;
    }

      console.log('Antes de llamar a AuthService.register');

      await this.authService.register(
        this.nombre, this.apellido, this.peso ?? 0, this.estatura ?? 0, this.email, this.password
      );

      console.log('Registro exitoso');

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Revisa tu correo para confirmar tu cuenta.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#188AFF'
      }).then(() => {
        this.router.navigate(['/auth/code-verification'], { queryParams: { email: this.email, registered: 'true' } });
      });

    } catch (error: any) {
      console.error('Error en el registro:', error);

      if (error.errores) {
        this.erroresValidacion = error.errores;
      } else if (error.mensaje) {
        this.erroresValidacion = { mensaje: error.mensaje };
      } else {
        this.erroresValidacion = { mensaje: 'Ocurrió un error inesperado.' };
      }
    } finally {
      this.isLoading = false;
    }
  }
}
