import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  ispermission: boolean = false;

  loginUserDetails: any = null;
  constructor(private router: Router) { }

  ngOnInit(): void  {
    //get data from local Storage
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (JSON.parse(this.loginUserDetails).permissions) {
      this.ispermission = true;
    } else {
      this.ispermission = false;
    }
  }
  logout(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }

  onClickLogout(): void {
    this.router.navigateByUrl('/logout');
  }

}
