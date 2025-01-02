import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserModule } from '../user/user.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent,UserModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }

  storedUsers: any = null;
  loginUserDetails: any;

  ngOnInit() {

   
  }

  logout(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }
}
