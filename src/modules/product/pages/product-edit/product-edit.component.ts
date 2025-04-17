import { Component, DestroyRef, effect, inject, resource } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@modules/product/services/product_service';
import { injectParams } from '@shared/utils/router';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  constructor(private router: Router) {
    // Cleanup abort controller on destroy
    this.destroyRef.onDestroy(() => this.abortController.abort());
    // Effect
    effect(() => {
      const product = this.productResource.value();
      if (!product) return;
      this.productForm.patchValue({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
      });
    });
  }

  // Get dependencies
  private abortController = new AbortController();
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);

  // Product detail resource
  productId$ = injectParams<string>('id');
  productResource = resource({
    request: () => this.productId$(),
    loader: ({ request, abortSignal }) =>
      this.productService.get(Number(request), { abortSignal }),
  });

  // Create form
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    rating: new FormControl(0, [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
  });

  async onSubmit() {
    // Validate form
    if (!this.productForm.valid) {
      return alert('Form is not valid!');
    }
    // Get form values
    const formValues = this.productForm.value;
    // Create product
    try {
      await this.productService.update({
        id: Number(this.productId$()),
        title: formValues.title ?? '',
        description: formValues.description ?? '',
        category: formValues.category ?? '',
        price: formValues.price ?? 0,
        rating: formValues.rating ?? 0,
        stock: formValues.stock ?? 0,
      });
      alert('Product updated successfully!');
      this.router.navigate(['products', this.productId$()]);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product!');
    }
  }
}
