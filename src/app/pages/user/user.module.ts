import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
{
    path: 'detail/:id',
    component: UserDetailComponent
},
{
    path: 'list',
    component: UserListComponent
}
];

@NgModule({
  declarations: [UserDetailComponent],
  imports: [CommonModule,RouterModule.forChild(routes),LayoutComponent,ReactiveFormsModule],
  exports:[],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class UserModule { }