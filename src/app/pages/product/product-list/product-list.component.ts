import { Component } from '@angular/core';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: any[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 50;
  searchString: string = '';
  userDetails: any = null;
  loginUserDetails: any = null;

  // pagination
  pagingParams!: BasicPagingParams;

  constructor(
    private productService : ProductService,
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
      this.productService.getAllUser(this.pagingParams).subscribe(data => {
        this.products = data.data;
        console.log(this.products);
        this.totalRecords = this.products.length;
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
