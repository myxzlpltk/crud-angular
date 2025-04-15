import { CurrencyPipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product_service';
import { injectParams } from '../../../utils/router';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  constructor(private router: Router) {}

  // Get dependencies
  private productService = inject(ProductService);
  // Product detail resource
  private productId$ = injectParams<string>('id');
  productResource = resource({
    request: () => this.productId$(),
    loader: ({ request, abortSignal }) =>
      this.productService.get(Number(request), { abortSignal }),
  });

  // Delete event handler
  async onDelete() {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const productId = Number(this.productId$());
        await this.productService.delete(productId);
        alert('Product deleted successfully!');
        this.router.navigate(['products']);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  }
}
