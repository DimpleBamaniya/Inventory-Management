import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  constructor(private router: Router) { }

storedUsers: any = null; 
ngOnInit(): void {
  
  this.storedUsers = localStorage.getItem('loginUserDetails');
  if(this.storedUsers.permission){
    this.router.navigateByUrl('/dashboard');
  }
  else{
    this.router.navigateByUrl('/dashboard');
  }
console.log(this.storedUsers);
}
}
