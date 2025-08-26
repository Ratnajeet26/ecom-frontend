import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../service/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatRadioModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cartService=inject(CartService);
formbuilder=inject(FormBuilder);
 router=inject(Router);
addressForm=this.formbuilder.group({
  address1:[''],
  address2:[''],
  city:[''],
  pincode:[''],
});
paymentType='cash';

ngOnInit(){
  this.cartService.init();
}
  readonly uploadsPath = `${environment.apiUrl}`;
removeFromCart(productId:string){
   this.cartService.removeFromCart(productId).subscribe(()=>{
    alert("Item Removed")
    this.cartService.init();
   })
}

increaseQuantity(item: any) {
  item.quantity++;
  // optionally: call backend API to update
  // this.cartService.updateCart(item.product._id, item.quantity).subscribe();
}

decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
    // optionally: call backend API to update
    // this.cartService.updateCart(item.product._id, item.quantity).subscribe();
  }

}

addToCart(productId:string,quantity:number){

  const item = this.cartService.items.find((i: any) => i.product._id === productId);

  if (!item) return;

  const newQuantity = item.quantity + quantity;

  // ✅ Prevent going below 1
  if (newQuantity< 1) {
    return;
  }

  this.cartService.addToCart(productId,quantity).subscribe((res)=>{
    this.cartService.init();
  })

}

  shipping: number = 199; // flat shipping charge


get subtotal(): number {
    return this.cartService.items.reduce((acc: number, item: any) => {
      const price = (item.product?.price || 0) - (item.product?.discount || 0);
      return acc + (price * item.quantity);
    }, 0);
  }

  // Getter for total (subtotal + shipping)
  get total(): number {
    return this.subtotal + this.shipping;
  }

  get cartItems(){
    return this.cartService.items
  }

  orderStep:number=0;
  checkout(){
    this.orderStep=1;
  }

  addAddress(){
    this.orderStep=2;
  }


  orderService=inject(OrderService);
  completeOrder(){
    let order:Order={
      items:this.cartItems,
      paymentType:this.paymentType,
      address:this.addressForm.value,
      date:new Date(),
      totalAmount:this.total,
    }
    console.log(order);
    this.orderService.addOrder(order).subscribe((res)=>{
      alert("Your Order is Submitted ...")
    })
    this.cartService.init();
    this.orderStep=0;
    this.router.navigateByUrl('/orders')
  }
}
