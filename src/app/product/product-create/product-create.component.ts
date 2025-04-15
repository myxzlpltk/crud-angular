import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product_service';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
  constructor(private router: Router) {
    // Cleanup abort controller on destroy
    this.destroyRef.onDestroy(() => this.abortController.abort());
  }

  // Get dependencies
  private abortController = new AbortController();
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);

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
      await this.productService.create(
        {
          title: formValues.title ?? '',
          description: formValues.description ?? '',
          category: formValues.category ?? '',
          price: formValues.price ?? 0,
          rating: formValues.rating ?? 0,
          stock: formValues.stock ?? 0,
        },
        { abortSignal: this.abortController.signal },
      );
      alert('Product created successfully!');
      this.router.navigate(['products']);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product!');
    }
  }
}
