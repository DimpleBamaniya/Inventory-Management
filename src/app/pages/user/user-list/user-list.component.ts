import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userDetails: any = null;
  // pagination
  pagingParams!: BasicPagingParams;

  constructor(
    private userService : UserService){
      this.initializePagination();
    }

  getAllUser(){
    this.userService.getAllUser(this.pagingParams).subscribe(userdetail => {
      this.userDetails = userdetail.data;
      console.log(this.userDetails);
    });
  }

   private initializePagination(): void {
      this.pagingParams = new BasicPagingParams();
      this.pagingParams.searchString = '';
      this.pagingParams.sortColumn = 'accountNumber';
      this.pagingParams.sortOrder = 'ASC';
      this.pagingParams.pageNo = 1;
      this.pagingParams.pageSize = 10;
    }
}
