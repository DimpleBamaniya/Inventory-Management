import { Component, OnInit } from '@angular/core';
import { CityService } from '../../city/city.service';
import { DepartmentService } from '../../department/department.service';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  cities: any = null;
  departments: any = null;
  userDetails: any = null;
  userForm: FormGroup;

  constructor(
    private userService : UserService,
    private cityService: CityService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private router: Router) { 
      this.userForm = this.fb.group({
        id: [""],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailID: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        cityID: ['', Validators.required],
        departmentID: ['', Validators.required]
      });
    }
    ngOnInit(): void {
      this.getAllCity();
      this.getAllDepartments();
      const userID = this._activeRoute.snapshot.paramMap.get('id');
      this.getUserDetails(userID);
    this.userForm.patchValue(this.userDetails); // P
  }

  getAllCity() {
    this.cityService.getAllCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(department => {
      this.departments = department;
    });
  }

  getUserDetails(userID: any){
      this.userService.getUserDetails(userID).subscribe(userdetail => {
        this.userDetails = userdetail.data;
        if (this.userDetails) {
          this.userForm.patchValue({
            id : this.userDetails.id,
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
            emailID: this.userDetails.emailID ? this.userDetails.emailID : '',
            password: this.userDetails.password ?this.userDetails.password : '',
            cityID: this.userDetails.cityID,
            departmentID: this.userDetails.departmentID
          });
        }
        else{
          this.router.navigateByUrl(`/dashbourd`);
        }
      });
    }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);

      this.userService.saveUser(this.userForm.value).subscribe(userdetail => {
      });
    } else {
      console.error('Form is invalid');

    }
  }
}
