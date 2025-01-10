import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
tableDatalist: any;
  tableDataColumn: any;
  dialogLabel: any;
  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the dynamic data and columns
  ) { }

  ngOnInit(): void {
    this.tableDatalist = this.data.tableData;
    this.tableDataColumn = this.data.columns;
    this.dialogLabel = 'Add Product'
    console.log(this.data.tableData);
  }

  // Close the dialog and redirect to ProductListComponent
  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/product/list');
  }
}
