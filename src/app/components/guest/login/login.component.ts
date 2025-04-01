import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CanExit } from '../../../guards/form-login.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { faUser, faKey ,faEye, 
  faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, FormsModule, RouterLink, CommonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit, CanExit, OnInit {
  cargando: boolean = true;
  faUser = faUser;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  email: string = '';
  verPassword: boolean = false;
  password: string = '';
  isFormDirty: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  erroresValidacion: any = {};

constructor(private authService: AuthService, private router: Router, private cargaService: CargaService) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    setTimeout(() => {
      this.cargaService.hide();
    }, 600);
  }

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

  async onSubmit() {
    this.errorMessage = '';
    this.erroresValidacion = {};
  
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Todos los campos son obligatorios.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    this.isLoading = true;
    try {
      const response = await this.authService.login(this.email, this.password);
      
      localStorage.setItem('token', response.token);
  
      this.router.navigate(['/user/home']);
  
    } catch (error: any) {
      if (error.type === 'unverified') {
        Swal.fire({
          icon: 'info',
          title: 'Correo no verificado',
          text: error.message,
          confirmButtonText: 'Ingresar código',
          confirmButtonColor: '#188AFF'
        }).then(() => {
          this.router.navigate(['/auth/code-verification'], { queryParams: { email: error.email } });
        });
  
      } else if (error.type === 'auth') {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Por favor, verifica tu correo y contraseña.',
          confirmButtonColor: '#d33'
        });
  
      } else if (error.errores) {
        this.erroresValidacion = error.errores;
  
      } else if (error.message) {
        this.errorMessage = error.message;
  
      } else {
        this.errorMessage = 'Ocurrió un error inesperado.';
      }
    } finally {
      this.isLoading = false;
    }
  }
  
  
}
