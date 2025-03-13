import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-code-verification',
  imports: [FormsModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.css'
})
export class CodeVerificationComponent {
  code: string = ''; // Ahora es una sola cadena en lugar de un array
  email: string = '';

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
      alert("No se ha recibido un correo válido.");
      return;
    }

    if (this.code.length !== 6) {
      alert("El código debe tener 6 dígitos.");
      return;
    }

    this.authService.verifyCode(this.email, this.code)
      .then(response => {
        alert('Código verificado correctamente.');
        this.router.navigate(['/user/home']); 
      })
      .catch(error => {
        alert(error.mensaje || 'Código incorrecto. Inténtalo de nuevo.');
      });
  }
}