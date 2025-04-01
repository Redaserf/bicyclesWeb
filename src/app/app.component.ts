import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CargaService } from './services/carga.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressBarModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pepito';
  cargando: boolean = true;

  constructor(private cargaService: CargaService) { }

  ngOnInit(): void {
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;//cuando cambie la variable cargando en el servicio se actualizara en el componente
    });

    this.cargaService.show();//se muestra la pantalla de carga al cargar los componentes en otras paginas se ocultara
  }

  
}
