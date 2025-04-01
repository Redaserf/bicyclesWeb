import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import necesario para Toastr
import { provideToastr } from 'ngx-toastr'; // Import de Toastr
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideAnimations(), // Necesario para Toastr
    provideToastr({
      timeOut: 3000, // Duración de 3 segundos
      positionClass: 'toast-top-right', // Posición arriba a la derecha
      preventDuplicates: true, // Evita notificaciones duplicadas
      progressBar: true, // Muestra barra de progreso
      closeButton: true, // Muestra botón de cerrar
    }),
  ],
};
