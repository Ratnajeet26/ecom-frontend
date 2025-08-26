import { Component, inject } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../types/order';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  imports: [DatePipe,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
orderService=inject(OrderService)
orders:Order[]=[];
  readonly uploadsPath = `${environment.apiUrl}`;

ngOnInit(){
this.orderService.getAllCustomerOrders().subscribe(res=>{
  console.log("All Orders",res);
  this.orders=res;
  
})
}
updateStatus(order:Order,status:any){
  console.log("status:",status.value);
  
  this.orderService.updateOrderStatus(order._id!,status.value).subscribe(res=>{
    alert("status updated")
  })
}
}
