import { Component, inject } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishListService=inject(WishlistService);

}
