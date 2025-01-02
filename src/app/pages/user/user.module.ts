import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from '../../app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [LoginComponent,LayoutComponent,DashboardComponent,UserDetailComponent,UserListComponent],
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  exports:[],
  providers: [UserService,HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class UserModule { }