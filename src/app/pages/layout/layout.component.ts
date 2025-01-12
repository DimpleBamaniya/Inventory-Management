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
  isShowProduct : boolean = false;
  isShowUserListButton: boolean = false;
  loginUserDetails: any = null;
  loggedInUserName: string = '';
  constructor(private router: Router,private _activeRoute: ActivatedRoute,) { }

  ngOnInit(): void  {
    //get data from local Storage
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (JSON.parse(this.loginUserDetails).permissions) {
      this.ispermission = true;
    } else {
      this.ispermission = false;
    }
    if(this.loginUserDetails != null){
      this.loggedInUserName= JSON.parse(this.loginUserDetails).firstName;
    }
    this.isShowUserList();
    this.isShowProductButton();
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

  isShowUserList(): void {
    const userID = this._activeRoute.snapshot.paramMap.get('id');
    if(this.router.url == ('/user/detail/'+ userID) && this.ispermission){
      this.isShowUserListButton = true;
    }else if(this.router.url == ('/product/list') && this.ispermission){
      this.isShowUserListButton = true;
    }else{
      this.isShowUserListButton = false;
    }
  }

  isShowProductButton(): void {
    if (this.router.url == ('/product/list') && this.ispermission) {
      this.isShowProduct = false;
    } else if (this.ispermission && this.router.url != '/userNotFound') {
      this.isShowProduct = true;
    }
  }

}
