import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Api } from '@core/api';

export const appConfig: ApplicationConfig = {
  providers: [
    // HttpClient
    { provide: Api },
    // Angular injection
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
