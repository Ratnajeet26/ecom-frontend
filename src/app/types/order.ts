import { cartItem } from "./cartItem"

 export  interface Order{
    _id?:string,
     items:cartItem[],
      paymentType:string,
      address:any,
      date:Date,
      totalAmount:number,
      status?:string
 }