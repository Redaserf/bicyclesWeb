import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../tabla-user.component';

@Component({
  selector: 'app-editar-usuario',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {
  usuario: Usuario | null = null;
  usuarioId!: number;
  usuarioForm!: FormGroup;
  mensajeExito: string = '';
  errores: any = {};

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id'));
      if (this.usuarioId) {
        this.cargarUsuario();
      }
    });

    this.usuarioForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      apellido: [this.usuario?.apellido, Validators.required],
      email: [{ value: this.usuario?.email, disabled: true }, [Validators.required, Validators.email]],
      peso: [this.usuario?.peso, [Validators.required, Validators.min(0)]],
      estatura: [this.usuario?.estatura, [Validators.required, Validators.min(0)]],
    });
  }

  cargarUsuario() {
    this.api.get(`usuario/${this.usuarioId}`)
      .then(response => {
        if(response.status === 200) {
          this.usuario = response.data;
          this.usuarioForm.patchValue(this.usuario!);
        }
      })
      .catch(error => {
        // console.error('Error al cargar el usuario:', error);
      });
  }

  actualizarUsuario() {
    if (this.usuarioForm.invalid) {
      Object.values(this.usuarioForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.api.put(`usuario/${this.usuario?.id}`, this.usuarioForm.value)
      .then(response => {

        if (response.status === 200) {
          this.mensajeExito = 'Usuario actualizado correctamente';
          setTimeout(() => {
            this.mensajeExito = '';
          }, 2000);
          this.router.navigate(['/admin/usuarios']);
        }else{
          // console.error('Error al actualizar el usuario:', response);
        }
        
      })
      .catch(error => {
        // console.error('Error al actualizar el usuario:', error);
        this.procesarErroresValidaciones(error);
      });
  }

  procesarErroresValidaciones(error: any) {
    if (error && error.errores) {//solo si son errores de validaciones
      this.errores = error.errores;
      Object.keys(this.errores).forEach((campo) => {
        if (this.usuarioForm.controls[campo]) {
          this.usuarioForm.controls[campo].setErrors({ servidor: this.errores[campo].join(' ') });
        }
      });
    }
  }

}
