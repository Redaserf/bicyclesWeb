import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userObject: any = {
    firstName: '',
    lastName: '',
    weight: '',
    email: '',
    password: '',
  }

  save(){
    const form_value = this.userObject;
  }

}
