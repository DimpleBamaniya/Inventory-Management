import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
{
    path: 'detail/:id',
    component: ProductDetailComponent
},
{
    path: 'list',
    component: ProductListComponent
}
];

@NgModule({
  declarations: [ProductDetailComponent,ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    ReactiveFormsModule,
    FormsModule,
    LayoutComponent,
    RouterLink  ]
})
export class ProductModule { }
