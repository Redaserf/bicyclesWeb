import { Component, OnInit } from '@angular/core';
import { CargaService } from '../../../services/carga.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {

  cargando: boolean = true;

  constructor(private cargaService: CargaService) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    setTimeout(() => {
      this.cargaService.hide();
    }, 600);
  }

}
