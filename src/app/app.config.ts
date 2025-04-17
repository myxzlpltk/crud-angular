import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from '../services/product_service';
import { Api } from '../core/api';

export const appConfig: ApplicationConfig = {
  providers: [
    // HttpClient
    { provide: Api },
    // Repositories
    { provide: ProductService },
    // Angular injection
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
