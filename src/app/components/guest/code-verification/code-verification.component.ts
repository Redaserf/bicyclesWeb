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
  code: string[] = ['', '', '', '', '', ''];
  email: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit(): void {
    const verificationCode = this.code.join('');

    this.authService.verifyCode(this.email, verificationCode)
      .then(response => {
        alert('Código verificado correctamente.');
        this.router.navigate(['/user/home']); // Redirigir al usuario
      })
      .catch(error => {
        alert(error.mensaje || 'Código incorrecto. Inténtalo de nuevo.');
      });
  }

  moveFocus(nextInput: HTMLInputElement | null, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  moveFocusBack(previousInput: HTMLInputElement | null, event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const input = event.target as HTMLInputElement;
  
    if (keyboardEvent.key === "Backspace") {
      input.value = '';  // Borra el contenido del input actual
      const index = this.code.indexOf(input.value);
      if (index !== -1) {
        this.code[index] = ''; // Asegura que también se borre en el array
      }
      if (previousInput) {
        previousInput.focus(); // Mueve el foco al input anterior
      }
    }
  }  
}
