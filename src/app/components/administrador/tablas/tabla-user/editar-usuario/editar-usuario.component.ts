import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Usuario } from '../tabla-user.component';
import { CargaService } from '../../../../../services/carga.service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-editar-usuario',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  cargando: boolean = true;
  usuario: Usuario | null = null;
  usuarioId!: number;
  usuarioForm!: FormGroup;
  mensajeExito: string = '';
  errores: any = {};
  isLoading = false;
  isCancelling = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private route: ActivatedRoute, private cargaService: CargaService, private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id'));
      if (this.usuarioId) {
        this.cargarUsuario();
      }
    });

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      peso: ['', [Validators.required, Validators.min(0)]],
      estatura: ['', [Validators.required, Validators.min(0)]],
    });
  }

  cargarUsuario() {
    this.api.get(`usuario/${this.usuarioId}`)
      .then(response => {
        if (response.status === 200 && response.data) {
          this.usuario = response.data;
          if (this.usuario) {
            this.usuarioForm.patchValue(this.usuario);
          }
        }        
        this.cargaService.hide();
      })
      .catch(error => {
        console.error('Error al cargar el usuario:', error);
        this.cargaService.hide();
      });
  }

  async actualizarUsuario() {
    if (this.usuarioForm.invalid) {
      Object.values(this.usuarioForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.isLoading = true;
    this.isCancelling = true;

    try {
      const response = await this.api.put(`usuario/${this.usuario?.id}`, this.usuarioForm.value);
      if (response.status === 200) {
      this.router.navigate(['/admin/usuarios']);
      this.toastr.success('Usuario actualizado correctamente.', '¡Éxito!');
      }
    } catch (error) {
      this.procesarErroresValidaciones(error);
      this.toastr.error('No se pudo actualizar el usuario.', 'Error');
    } finally {
      // this.isLoading = false;
    }
  }

  cancelarEdicion() {
    this.isCancelling = true;
    this.router.navigate(['/admin/usuarios']).then(() => {
      // this.isCancelling = false;
    });
  }

  procesarErroresValidaciones(error: any) {
    if (error && error.errores) {
      this.errores = error.errores;
      Object.keys(this.errores).forEach((campo) => {
        if (this.usuarioForm.controls[campo]) {
          this.usuarioForm.controls[campo].setErrors({ servidor: this.errores[campo].join(' ') });
        }
      });
    }
  }
}
