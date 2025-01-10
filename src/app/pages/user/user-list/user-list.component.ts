import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { Router} from '@angular/router';

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
  isNoRecordFound : boolean = false;

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
      this.userService.getAllUser(this.pagingParams).subscribe(data => {
        this.users = data.data;
        console.log(this.users);
        this.totalRecords = this.users.length;
        if(this.totalRecords == 0){
          this.isNoRecordFound = true;
        }
        else{
          this.isNoRecordFound = false;
        }
        console.log(this.totalRecords);
      });
    }
  
    searchUsers() {
      this.currentPage = 1; // Reset to first page on search
      this.pagingParams.searchString = this.searchString;
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

  changeSortColumn(column: any) {
    if (this.pagingParams.sortOrder == 'ASC') {
      this.pagingParams.sortOrder = 'DESC';
    } else {
      this.pagingParams.sortOrder = 'ASC';
    }
    this.pagingParams.sortColumn  = column;
    this.fetchUsers();

  }

   private initializePagination(): void {
      this.pagingParams = new BasicPagingParams();
      this.pagingParams.searchString = '';
      this.pagingParams.sortColumn = 'ID';
      this.pagingParams.sortOrder = 'ASC';
      this.pagingParams.pageNo = 1;
      this.pagingParams.pageSize = 10;
    }
}
