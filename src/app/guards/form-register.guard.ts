import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanExit {
  canExit: () => boolean | Observable<boolean>;
}
@Injectable({
  providedIn: 'root'
})
export class FormRegisterGuard implements CanDeactivate<CanExit> {
  canDeactivate(component: CanExit): boolean | Observable<boolean> {
    return component.canExit ? component.canExit() : true;
  }
}