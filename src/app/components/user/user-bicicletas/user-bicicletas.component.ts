import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-user-bicicletas',
  imports: [],
  templateUrl: './user-bicicletas.component.html',
  styleUrl: './user-bicicletas.component.css'
})
export class UserBicicletasComponent {
   ngOnInit(): void {
      AOS.init({
        offset: 100,
        delay: 0,
        duration: 1000,
        easing: 'ease-in-out',
        once: false
      });
    }
    bicicletas = [
      { nombre: "Bici Roja" },
      { nombre: "Bici Azul" },
      { nombre: "Bici Verde" },
      { nombre: "Bici Negra" },
      { nombre: "Bici Blanca" }
    ];
  
    modalAgregar = false;
    modalEditar = false;
    modalEliminar = false;
    nuevaBici = '';
    indiceEditar!: number;
    indiceEliminar!: number;
  
    abrirModalAgregar() {
      this.modalAgregar = true;
    }
  
    abrirModalEditar(index: number) {
      this.indiceEditar = index;
      this.modalEditar = true;
    }
  
    abrirModalEliminar(index: number) {
      this.indiceEliminar = index;
      this.modalEliminar = true;
    }
  
    cerrarModal() {
      this.modalAgregar = false;
      this.modalEditar = false;
      this.modalEliminar = false;
    }
  
    agregarBicicleta() {
      if (this.nuevaBici.trim()) {
        this.bicicletas.push({ nombre: this.nuevaBici });
        this.nuevaBici = '';
      }
      this.cerrarModal();
    }
  
    eliminarBicicleta() {
      this.bicicletas.splice(this.indiceEliminar, 1);
      this.cerrarModal();
    }
}
