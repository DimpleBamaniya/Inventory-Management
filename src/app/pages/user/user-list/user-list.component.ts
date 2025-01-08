import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from '../../layout/layout.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})


export class UserListComponent {
  users: any[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 50;
  searchString: string = '';
  userDetails: any = null;
  loginUserDetails: any = null;

  // pagination
  pagingParams!: BasicPagingParams;

  constructor(
    private userService : UserService,
  private router: Router){
      this.initializePagination();
    }
    ngOnInit(): void {
      this.loginUserDetails = localStorage.getItem('loginUserDetails');
      if(this.loginUserDetails == null){
        this.router.navigateByUrl(`/login`);
      }
      this.fetchUsers();
    }

    fetchUsers() {
      const pagination = {
        SearchString: this.searchString,
        PageNo: this.currentPage,
        PageSize: this.pageSize,
        SortColumn: 'ID',  // Default column to sort by
        SortOrder: 'ASC'  // Default sorting order
      };
  
      this.userService.getAllUser(pagination).subscribe(data => {
        this.users = data.data;
        console.log(this.users);
        this.totalRecords = this.users.length;
        console.log(this.totalRecords);
      });
    }
  
    searchUsers() {
      this.currentPage = 1; // Reset to first page on search
      this.fetchUsers();
    }
  
    nextPage() {
      if ((this.currentPage * this.pageSize) < this.totalRecords) {
        this.currentPage++;
        this.fetchUsers();
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers();
      }
    }

  // getAllUser(){
  //   this.userService.getAllUser(this.pagingParams).subscribe(userdetail => {
  //     this.userDetails = userdetail.data;
  //     console.log(this.userDetails);
  //   });
  // }

   private initializePagination(): void {
      this.pagingParams = new BasicPagingParams();
      this.pagingParams.searchString = '';
      this.pagingParams.sortColumn = 'accountNumber';
      this.pagingParams.sortOrder = 'ASC';
      this.pagingParams.pageNo = 1;
      this.pagingParams.pageSize = 10;
    }
}
