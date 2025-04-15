import { CurrencyPipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product_service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  // Get product service
  private productService = inject(ProductService);
  // Product list
  productsResource = resource({
    request: () => ({ limit: 10, page: 1 }),
    loader: ({ request, abortSignal }) =>
      this.productService.getAll(request, { abortSignal }),
  });
}
