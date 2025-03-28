import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-admin-perfil',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-perfil.component.html',
  styleUrl: './admin-perfil.component.css'
})
export class AdminPerfilComponent implements OnInit {
  cargando: boolean = true;
  perfilForm!: FormGroup;
  errores: any = {};

  constructor(private api: ApiService, private cargaService: CargaService) { }



  guardarPerfil() {

    this.api.put('usuario', this.perfilForm.value).then((response: any) => {
      console.log(response);
    }).catch((error: any) => {
      this.procesarErroresValidaciones(error);
      console.log('jasdf', error);
    });

  }

  procesarErroresValidaciones(error: any) {
    if (error && error.errores) {
      this.errores = error.errores;
      Object.keys(this.errores).forEach((campo) => {
        if (this.perfilForm.controls[campo]) {
          this.perfilForm.controls[campo].setErrors({ servidor: this.errores[campo][0] });//solo el primer error
        }
      });
    }
  }

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;//aqui se cambia el estado cuando cambia el estado
    });

    this.perfilForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
      peso: new FormControl('', [Validators.required, Validators.min(20)]),
      estatura: new FormControl('', [Validators.required, Validators.min(0)]),
    }); 

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
      this.cargaService.hide();
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
