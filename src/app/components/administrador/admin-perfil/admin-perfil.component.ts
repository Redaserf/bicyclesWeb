import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AOS from 'aos';
import { ApiService } from '../../../services/api-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CargaService } from '../../../services/carga.service';
declare var bootstrap: any;

@Component({
  selector: 'app-admin-perfil',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-perfil.component.html',
  styleUrl: './admin-perfil.component.css'
})
export class AdminPerfilComponent implements OnInit {

  @ViewChild('editProfileModal') editProfileModal!: ElementRef;
  cargando: boolean = true;
  perfilForm!: FormGroup;
  errores: any = {};
  perfilOriginal: any = {};
  isLoading = false;
  private modalInstance: any;

  constructor(private api: ApiService, private cargaService: CargaService) { }

  ngOnInit(): void {

    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    this.perfilForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      peso: new FormControl('', [Validators.required, Validators.min(20)]),
      estatura: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.cargarPerfil();
  
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      once: false
    });

  }

  async guardarPerfil() {
    this.isLoading = true;
  
    try {
      const response = await this.api.put('usuario', this.perfilForm.value);
      console.log(response);
      this.cargarPerfil();
      this.cerrarModal();
    } catch (error: any) {
      this.procesarErroresValidaciones(error);
      console.log('Error al guardar el perfil:', error);
    } finally {
      this.isLoading = false;
    }
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

  cargarPerfil() {
    this.api.get('user').then((response: any) => {
      const data = response.data;
      console.log('datos', data);
  
      this.perfilOriginal = { ...data };
  
      this.perfilForm.setValue({
        nombre: this.perfilOriginal.nombre,
        apellido: this.perfilOriginal.apellido,
        email: this.perfilOriginal.email,
        peso: this.perfilOriginal.peso,
        estatura: this.perfilOriginal.estatura,
      });

      this.cargaService.hide();

    }).catch((error) => {
      console.error('Error al cargar el perfil:', error);
    });
  } 

  cancelarEdicion() {
    this.perfilForm.setValue({
      nombre: this.perfilOriginal.nombre,
      apellido: this.perfilOriginal.apellido,
      email: this.perfilOriginal.email,
      peso: this.perfilOriginal.peso,
      estatura: this.perfilOriginal.estatura,
    });

    this.cerrarModal();
    // console.log('Valores restaurados al cancelar.');
  }
  
  abrirModal() {
    const modalElement = this.editProfileModal.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }

  cerrarModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
  }
  
}