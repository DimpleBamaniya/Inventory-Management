import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { Router } from '@angular/router';
import { UserProductService } from '../../user-product/user-product.service';
import { DynamicTableDataDialogComponent } from '../../../core/dynamic-table-data-dialog/dynamic-table-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  isNoRecordFound: boolean = false;
  userProductDetail: any = null;
  columns: any = null; // Dynamic columns to be passed to the dialog

  // pagination
  pagingParams!: BasicPagingParams;
  totalPages = 0;

  constructor(
    private userService: UserService,
    private userProductService: UserProductService,
    public dialog: MatDialog,
    private router: Router) {
    this.initializePagination();
  }

  ngOnInit(): void {
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUser(this.pagingParams).subscribe((response: any) => {
      this.users = response.data;
      this.totalRecords = this.users.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pagingParams.pageSize);
      if (this.totalRecords == 0) {
        this.isNoRecordFound = true;
      }
      else {
        this.isNoRecordFound = false;
      }
    });
  }

  changeSortColumn(column: string): void {
    this.pagingParams.sortColumn = column;
    this.pagingParams.sortOrder =
      this.pagingParams.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.fetchUsers();
  }

  changePageSize(pageSize: any): void {
    const pageSizeValue = (pageSize.target as HTMLSelectElement).value;
    this.pagingParams.pageSize = Number(pageSizeValue);
    this.pagingParams.pageNo = 1; // Reset to first page
    this.fetchUsers();
  }

  changePage(pageNo: number): void {
    debugger
    this.pagingParams.pageNo = pageNo;
    this.fetchUsers();
  }

  searchUsers() {
    this.currentPage = 1; // Reset to first page on search
    this.pagingParams.searchString = this.searchString;
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

  getProductListbyUserID(userID: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userProductService.getProductListbyUserID(userID).subscribe({
        next: (userdetail) => {
          this.userProductDetail = userdetail.data;
          resolve(this.userProductDetail); // Resolving the promise with the product data
        },
        error: (error) => {
          reject(error); // Rejecting the promise with the error
        }
      });
    });
  }

  DeleteUser(userid: any) {
    this.userProductService.getProductListbyUserID(userid).subscribe(user => {
      if (user.data.length >= 1) {
        var userList = user.data;
        this.columns = ['ID', 'Product']
        const dialogRef = this.dialog.open(DynamicTableDataDialogComponent, {
          data: {
            columns: this.columns, // Passing dynamic column names
            tableData: userList, // Passing dynamic data (categoriesResponse)
            dialogLabel: 'Product List', // Passing dynamic label
            label: "You can't delete User because User assigned following Products."
          },
          width: '500px',
        });

        // After dialog closes, navigate back to the product list
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/user/list');
        });
      }
      else {
        var param = {
          userId: userid,
          deletedBy: (JSON.parse(this.loginUserDetails).id)
        }
        this.userService.DeleteUser(param).subscribe(isDeleted => {
          this.refreshPage();
        });
      }
    });
  }

  refreshPage() {
    window.location.reload();
  }

}
