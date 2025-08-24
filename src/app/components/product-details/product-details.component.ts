import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProductCardComponent } from "../product-card/product-card.component";
import { WishlistService } from '../../service/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../types/product';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ProductCardComponent,MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  customerService=inject(CustomerService);
  route=inject(ActivatedRoute);
  similarProducts:any;



  product: any = {};
selectedImage: string = '';

ngOnInit() {
  this.route.params.subscribe((x:any)=>{
    this.getProductDetails(x.id)
  });
  
}
getProductDetails(id:string){
  this.customerService.getProductById(id).subscribe((res) => {
    this.product = res;
    this.selectedImage = this.product.images?.[0]; // first image as default
    this.customerService.getProducts('',this.product.categoryId,'',0,'',1,4).subscribe(res=>{
      this.similarProducts=res;
    })
  });
}

changeImage(img: string) {
  this.selectedImage = img;
}
  readonly uploadsPath = `${environment.apiUrl}`;


 wishListService=inject(WishlistService);
cartService=inject(CartService);


  addToWishlist(product:Product){
    console.log("Product Added to Wishlist",product);
    if(this.isInWishList(product)){
      this.wishListService.removeFromWishList(product._id!).subscribe((result)=>{
this.wishListService.init();
      })
    }
    else{
      this.wishListService.addTOWishList(product._id!).subscribe((result)=>{
this.wishListService.init();
      })
    }


  }

   isInWishList(product:Product){

    let isExist=this.wishListService.wishList.find(x=>x._id==product._id)
    if (isExist) {
      return true
    } else {
      return false
    }

  }

    addToCart(item:Product){
console.log(item);
if(!this.isProductInCart(item._id!)){
  this.cartService.addToCart(item._id!,1).subscribe(()=>{
    this.cartService.init();
  })

}
else{
  this.cartService.removeFromCart(item._id!).subscribe(()=>{
    this.cartService.init();
  })
}
  }

  isProductInCart(productId:string){
    if(this.cartService.items.find(x=>x.product._id==productId)){
      return true
    }
    else{
      return false
    }

  }

}
