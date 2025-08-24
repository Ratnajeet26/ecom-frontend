import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { cartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  http=inject(HttpClient);
  items:cartItem[]=[
  ];
  init(){
    this.getCartsItems().subscribe(result=>{
      this.items=result;
    })
  }


   getCartsItems(){
    return this.http.get<cartItem[]>(environment.apiUrl+'/customer/cart')
   }

   addToCart(productId:string,quantity:number){
        return this.http.post(environment.apiUrl+'/customer/cart/'+productId,{
          quantity:quantity
        })

   }

   removeFromCart(productId:string){
    return this.http.delete(environment.apiUrl+"/customer/cart/"+productId)
   }
}
