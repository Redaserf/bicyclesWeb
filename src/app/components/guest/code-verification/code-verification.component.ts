import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-verification',
  imports: [FormsModule, CommonModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.css'
})
export class CodeVerificationComponent {
  code: string = '';
  email: string = '';
  isVerifying: boolean = false; // Para mostrar el ícono de carga en el botón
  isResending: boolean = false; // Para mostrar el estado de reenviar correo

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      console.log("Email recibido:", this.email);
    });
  }

  onSubmit(): void {
    console.log("Código ingresado:", this.code);

    if (!this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha recibido un correo válido.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (this.code.length !== 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Código inválido',
        text: 'El código debe tener 6 dígitos.',
        confirmButtonColor: '#FFA500'
      });
      return;
    }

    this.isVerifying = true; // Activar el estado de verificación

    this.authService.verifyCode(this.email, this.code)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Verificación exitosa',
          text: 'Tu cuenta ha sido verificada correctamente.',
          confirmButtonText: 'Iniciar sesión',
          confirmButtonColor: '#188AFF'
        }).then(() => {
          this.router.navigate(['/user/home']);
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Código incorrecto',
          text: error.mensaje || 'Código incorrecto. Inténtalo de nuevo.',
          confirmButtonColor: '#d33'
        });
      })
      .finally(() => {
        this.isVerifying = false; // Desactivar el estado de verificación
      });
  }

  resendEmail(): void {
    if (!this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha recibido un correo válido.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    this.isResending = true;

    this.authService.resendVerificationEmail(this.email)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Correo reenviado',
          text: response.mensaje || 'Se ha reenviado el código de verificación.',
          confirmButtonColor: '#188AFF'
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.mensaje || 'No se pudo reenviar el correo.',
          confirmButtonColor: '#d33'
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.isResending = false;
        }, 2000);
      });
  }
}
