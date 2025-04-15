import { Routes } from '@angular/router';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ],
  },
];
