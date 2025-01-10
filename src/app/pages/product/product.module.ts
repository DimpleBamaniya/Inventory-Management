import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
    RouterLink,
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule,
],
     exports:[],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      bootstrap: []
})
export class ProductModule { }
