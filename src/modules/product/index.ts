import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '@modules/product/pages/product-list/product-list.component';
import { ProductCreateComponent } from '@modules/product/pages/product-create/product-create.component';
import { ProductDetailComponent } from '@modules/product/pages/product-detail/product-detail.component';
import { ProductEditComponent } from '@modules/product/pages/product-edit/product-edit.component';
import { NgModule } from '@angular/core';
import { ProductService } from '@modules/product/services/product_service';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: 'edit/:id', component: ProductEditComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
