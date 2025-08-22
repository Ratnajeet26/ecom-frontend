import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../service/wishlist.service';

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
}
