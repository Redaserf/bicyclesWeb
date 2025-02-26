import {AfterViewInit, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import * as AOS from 'aos';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register',
  imports: [FormsModule,FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit{

  userObject: any = {
    nombre: '',
    apellido: '',
    peso: '',
    email: '',
    password: '',
  }

  confirm_password: string = '';

  ngAfterViewInit(): void {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });

  }

  save(){



    if(this.confirm_password == this.userObject.password){

      const form_value = this.userObject;
      console.log(form_value);

    }
  }

}
