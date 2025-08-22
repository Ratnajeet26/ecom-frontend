import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
    http = inject(HttpClient);
    wishList:Product[]=[];


  constructor() { }

  init(){
    this.getWishList().subscribe((result)=>{
this.wishList=result;
    })
  }
   getWishList(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/wishlist")
  }

  addTOWishList(productId:string){
    return this.http.post(environment.apiUrl+'/customer/wishlist/'+productId,{})
  }
  removeFromWishList(productId:string){
    return this.http.delete(environment.apiUrl+'/customer/wishlist/'+productId,{})
  }
}
