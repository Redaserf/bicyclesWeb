import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  private cargando: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public cargando$ = this.cargando.asObservable();


  show() {
    this.cargando.next(true);
  }

  hide() {
    this.cargando.next(false);
  }

}
