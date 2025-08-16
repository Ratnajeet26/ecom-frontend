import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
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
}
