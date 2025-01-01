import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }

}
