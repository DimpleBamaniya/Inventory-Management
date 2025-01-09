import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterLink,LogoutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  ispermission: boolean = false;
  isShowProductButton : boolean = false;
  isShowUserListButton: boolean = false;
  loginUserDetails: any = null;
  constructor(private router: Router,private _activeRoute: ActivatedRoute,) { }

  ngOnInit(): void  {
    //get data from local Storage
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (JSON.parse(this.loginUserDetails).permissions) {
      this.ispermission = true;
    } else {
      this.ispermission = false;
    }
    this.showUserList();
    this.showProductButton();
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

  login(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }

  getUserList(): void {
      // Navigate to the login page
      this.router.navigateByUrl('/user/list');
  }

  showUserList(): void {
    const userID = this._activeRoute.snapshot.paramMap.get('id');
    if(this.router.url == ('/user/detail/'+ userID) && this.ispermission){
      this.isShowUserListButton = true;
    }
  }

  showProductButton(): void {
    if(this.ispermission && this.router.url != '/userNotFound'){
      this.isShowProductButton = true;
    }
  }

}
