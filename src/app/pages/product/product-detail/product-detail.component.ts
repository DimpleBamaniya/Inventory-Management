import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { ProductBrandService } from '../../product-brand/product-brand.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  tableDatalist: any;
  tableDataColumn: any;
  dialogLabel: any;
  productCategories: any = null;
  productBrands: any = null;
  productForm: FormGroup;
  dataForSave: any = null;
  loginUserDetails :any = null;


  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService,
    private productService: ProductService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the dynamic data and columns
  ) {
    this.productForm = this.fb.group({
      id: [''],
      categoryID: ['', [Validators.required]],
      brandID: ['', [Validators.required]],
      quantity: [null],
    });
  }

  ngOnInit(): void {
    this.dialogLabel = 'Add Product';
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }
    if (this.data.tableData != null && this.data.tableData != 0) {
      this.dialogLabel = 'Edit Product Stock';
      this.productForm.patchValue({
        id: this.data.tableData.id ? this.data.tableData.id : '',
        brandID: this.data.tableData.brandID ? this.data.tableData.brandID : '',
        categoryID: this.data.tableData.categoryID
          ? this.data.tableData.categoryID
          : '',
        quantity: this.data.tableData.quantity
          ? this.data.tableData.quantity
          : null,
      });
      this.productForm.controls['brandID'].disable();
      this.productForm.controls['categoryID'].disable();
    }else{
      this.productForm.controls['brandID'].enable();
      this.productForm.controls['categoryID'].enable();
    }
 
    this.getAllProductCategories();
    this.getAllProductBrands();
  }

  // Close the dialog and redirect to ProductListComponent
  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/product/list');
  }

  getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((pc) => {
      this.productCategories = pc;
      console.log(this.productCategories);
    });
  }

  getAllProductBrands() {
    this.productBrandService.getAllProductBrands().subscribe((pb) => {
      this.productBrands = pb;
      console.log(this.productBrands);
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.productForm.valid) {
      this.dataForSave = this.productForm.value;
      if (this.dataForSave.id != null && this.dataForSave.id != 0) {
        this.dataForSave.categoryID  = this.productForm.controls['categoryID'].value;
        this.dataForSave.brandID = this.productForm.controls['brandID'].value;
        this.dataForSave.modifiedBy = (JSON.parse(this.loginUserDetails).id);
      }
      else {
        this.dataForSave.id = 0;
        this.dataForSave.createdBy = (JSON.parse(this.loginUserDetails).id);
      }
      this.productService.saveProduct(this.dataForSave).subscribe(productdetail => {
        this.dialogRef.close();
      })
    }
  }
}
