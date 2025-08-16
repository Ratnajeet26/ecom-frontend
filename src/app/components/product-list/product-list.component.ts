import { Component, inject } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatButtonModule,

    ReactiveFormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  page = 1;
  pageSize = 2;
  products: Product[] = [];
  category: any = [];
  brand: any = [];

  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  isNext=true


  // ngOnInit() {
  //   this.route.queryParams.subscribe((x: any) => {
  //     console.log(x);
  //     this.searchTerm = x.search || '';
  //     this.categoryId = x.categoryId || '';
  //     console.log("categoryId",this.categoryId);
      
  //     this.getProduct();
  //   });
  //   this.customerService.getCategory().subscribe((res) => {
  //     this.category = res;
  //     console.log('Categories', this.category);
  //   });

  //   this.customerService.getBrands().subscribe((res) => {
  //     this.brand = res;
  //     console.log("Brands:",this.brand);
      
  //   });
  // }
  ngOnInit() {
  this.route.queryParams.subscribe((x: any) => {
    this.searchTerm = x.search || '';
    this.categoryId = x.categoryId || '';
    console.log('categoryId from query:', this.categoryId);

    this.getProduct();
  });

  this.customerService.getCategory().subscribe((res) => {
    this.category = res;
    console.log('Categories', this.category);

    // Re-assign categoryId after categories are loaded
    // so mat-select can match the option value
    this.categoryId = this.categoryId; 
  });

  this.customerService.getBrands().subscribe((res) => {
    this.brand = res;
    console.log('Brands:', this.brand);
  });
}


  getProduct() {
    console.log('Calling getProducts API...');
setTimeout(()=>{ this.customerService.getProducts(
   this.searchTerm,  // searchTerm
  this.categoryId,  // categoryId
  this.sortBy,      // sortBy
  this.sortOrder,   // sortOrder
  this.brandId,     // brandId
  this.page,        // page
  this.pageSize   
)

      .subscribe((res) => {
        this.products = res;
        console.log("Search Product:",this.products);
    this.isNext = this.products.length < this.pageSize;

        
      });

},1000)
    
  }

  orderChange(event:any){
    console.log(event);
    this.sortBy='price'
    this.sortOrder=event;
    this.getProduct();

  }
pageChange(page: number) {
  this.page = page;
  this.getProduct();
}
}
