import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-perfil',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-perfil.component.html',
  styleUrl: './admin-perfil.component.css'
})
export class AdminPerfilComponent implements OnInit {

  perfilForm!: FormGroup;

  constructor(private api: ApiService) { }



  guardarPerfil() {

    if (this.perfilForm.valid) {
      const data = this.perfilForm.value;
      console.log('data', data);
      this.api.put('user', data).then((response: any) => {
        console.log('response', response);
      });
    } else {
      console.log('Formulario no valido');
    }

  }

  cambiarFoto(event: Event) {

  }



  ngOnInit(): void {
    this.api.get('user').then((response: any) => {
      const data = response.data;
      console.log('datos', data);
      this.perfilForm.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        peso: data.peso,
        estatura: data.estatura,
      });
    });

    this.perfilForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      peso: new FormControl('', [Validators.required, Validators.min(20)]),
      estatura: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });
  }
}
