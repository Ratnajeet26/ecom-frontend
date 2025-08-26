import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../service/order.service';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customers-orders',
  imports: [DatePipe],
  templateUrl: './customers-orders.component.html',
  styleUrl: './customers-orders.component.scss'
})
export class CustomersOrdersComponent {
orders:Order[]=[];
orderService=inject(OrderService)
  readonly uploadsPath = `${environment.apiUrl}`;


ngOnInit(){
  this.orderService.getAllCustomerOrders().subscribe(res=>{
    console.log(res);
    this.orders=res
    
  })
}
}
