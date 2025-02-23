import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from "./pages/all/logo/logo.component";
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogoComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bicyclesWeb';
  
  opcionesSeguimiento = [
    {nombre: "Iniciar Sesión", ruta: "#"},
    {nombre: "Informacion", ruta: "#"},
    {nombre: "Descargar-App", ruta: "#"},
    {nombre: "Contactanos", ruta: "#"},
  ];

}
