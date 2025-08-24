import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../service/wishlist.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,CommonModule,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() item!: Product;
  readonly uploadsPath = `${environment.apiUrl}`;
  // img(path?: string): string {
  //   return path
  //     ? environment.apiUrl + path // host + “/uploads/…”
  //     : 'https://via.placeholder.com/150';
  // }

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
