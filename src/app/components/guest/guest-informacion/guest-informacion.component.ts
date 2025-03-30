import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../global/footer/footer.component';
import { LogoComponent } from '../../global/logo/logo.component';
import { CargaService } from '../../../services/carga.service';
import * as AOS from 'aos';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-guest-informacion',
  imports: [FooterComponent, LogoComponent, NgIf],
  templateUrl: './guest-informacion.component.html',
  styleUrl: './guest-informacion.component.css'
})
export class GuestInformacionComponent implements OnInit, AfterViewInit {
  cargando: boolean = true;

  constructor(private cargaService: CargaService) { }

  ngOnInit(): void {
    this.cargaService.show();
    this.cargaService.cargando$.subscribe((cargando) => {
      this.cargando = cargando;
    });

    setTimeout(() => {
      this.cargaService.hide();
    }, 600);
  }

    ngAfterViewInit(): void {
      AOS.init({
        offset: 100,
        delay: 0,
        duration: 1000,
        easing: 'ease-in-out',
        once: false
      });
    }
}
