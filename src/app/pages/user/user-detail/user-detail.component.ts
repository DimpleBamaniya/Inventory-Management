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
  loginUserDetails: any = null;
  dataForSave: any = null;
  isReadOnly: boolean = true;
  isUpdateForm: boolean = false;
  isSubmited: boolean = false;
  labelForAddUser: string = '';
  labelForEditUser: string = '';

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private router: Router) {
    this.userForm = this.fb.group({
      id: [""],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      emailID: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cityID: [''],
      departmentID: ['']
    });
  }
  ngOnInit(): void {
    this.userForm.controls['cityID'].disable();
    this.userForm.controls['departmentID'].disable();
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }
    this.getAllCity();
    this.getAllDepartments();
    const userID = this._activeRoute.snapshot.paramMap.get('id');
    this.getUserDetails(userID)
      .then((userDetails) => {
        if (userDetails == null) {
          this.labelForAddUser = "Add User"
          this.isUpdateForm = false;
          this.userForm.get('cityID')?.clearValidators();
          this.userForm.get('departmentID')?.clearValidators();
        }
        else {
          this.labelForEditUser = "Edit User"
          this.isUpdateForm = true;
          this.userForm.get('cityID')?.setValidators([Validators.required]);
          this.userForm.get('departmentID')?.setValidators([Validators.required]);
        }
        this.userForm.get('cityID')?.updateValueAndValidity();
        this.userForm.get('departmentID')?.updateValueAndValidity();
      })
      .catch((error) => {
        console.error('Error loading user details:', error);
      });
    // this.userForm.patchValue(this.userDetails);

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

  getUserDetails(userID: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUserDetails(userID).subscribe({
        next: (userdetail) => {
          this.userDetails = userdetail.data;
          if (this.userDetails) {
            this.userForm.patchValue({
              id: this.userDetails.id,
              firstName: this.userDetails.firstName,
              lastName: this.userDetails.lastName,
              emailID: this.userDetails.emailID ? this.userDetails.emailID : '',
              password: this.userDetails.password ? this.userDetails.password : '',
              cityID: this.userDetails.cityID ? this.userDetails.cityID: '',
              departmentID: this.userDetails.departmentID ? this.userDetails.departmentID : '',
            });
            resolve(this.userDetails);
          } else if (userID == 0) {
            this.userForm.patchValue({
              id: 0,
              firstName: '',
              lastName: '',
              emailID: '',
              password: '',
              cityID: '',
              departmentID: '',
            });
            resolve();
          }
          else {
            this.router.navigateByUrl(`/userNotFound`);
            reject(new Error('User not found'));
          }
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }


  onSubmit() {
    this.isSubmited = true;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.userForm.valid) {
      this.dataForSave = this.userForm.value;
      if (this.dataForSave.id) {
        this.dataForSave.modifiedBy = (JSON.parse(this.loginUserDetails).id);
      }
      else {
        this.dataForSave.createdBy = (JSON.parse(this.loginUserDetails).id);
      }

      this.userService.saveUser(this.dataForSave).subscribe(userdetail => {
        if (this.isUpdateForm) {
          this.refreshPage();
        } else {
          this.router.navigateByUrl('/user/list');
        }
      });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  OnChangeEdit() {
    this.isReadOnly = false;
    this.userForm.controls['cityID'].enable();
    this.userForm.controls['departmentID'].enable();
  }

  // Getter methods for form controls to simplify validation logic in the template
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get emailID() {
    return this.userForm.get('emailID');
  }

  get password() {
    return this.userForm.get('password');
  }
  get departmentID() {
    return this.userForm.get('departmentID');
  }
  get cityID() {
    return this.userForm.get('cityID');
  }
}
