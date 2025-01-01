import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //variable declaration
  isLoginUser: boolean = false;
  loginUserDetails : any;
  loginForm : FormGroup;

  constructor(private http: HttpClient, private userService: UserService, private router: Router,private _formBuilder: FormBuilder) { 
    this.loginForm = this._formBuilder.group({
      emailID: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
 
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.data != null) {
        this.isLoginUser = true;
        this.loginUserDetails = res.data;
        localStorage.setItem('loginUserDetails', JSON.stringify(this.loginUserDetails));
        this.router.navigateByUrl('/dashboard');

      } else {
        alert(res.message);
      }

    });
  }


  // Getter methods for form controls to simplify validation logic in the template
  get emailID() {
    return this.loginForm.get('emailID');
  }

  get password() {
    return this.loginForm.get('password');
  }

  
}
