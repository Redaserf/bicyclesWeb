import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-verification',
  imports: [FormsModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.css'
})
export class CodeVerificationComponent {
  code: string[] = ['', '', '', '', '', ''];

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

  onSubmit(): void {
    const verificationCode = this.code.join('');
    console.log('Código ingresado:', verificationCode);
  }
}
