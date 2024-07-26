import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryElement } from '../../category/components/category/category.component';

import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  private productService = inject(ProductService)
  private snackBar = inject(MatSnackBar)
  public dialog = inject(MatDialog)


  ngOnInit(): void {
    this.getProducts();
  }
  displayedColumns: string[] = ['id', 'name', 'price','account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
    .subscribe((data:any)=> {
      console.log("respuesta de productos", data);
      this.processProductResponse(data);
    }, (error:any)=>{
      console.log("error en productos", error);

    })
  }
  processProductResponse(resp: any){
    const dateProduct: ProductElement[] = [];
    if( resp.metadata[0].code == "00") {
      let listProduct = resp.product.products
      listProduct.forEach((element: ProductElement) => {
      element.category = element.category.name;
      element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });
     // set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
      
    }

  }

}export interface ProductElement{
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
