import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

// install Swiper modules

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  customerService = inject(CustomerService);

  newProduct: Product[] = [];
  featuredProduct: Product[] = [];

  /** Products you want to show in the hero/banner slider */
  bannerProducts: Product[] = [];

  /** Absolute banner image URLs for the template */
  bannerImageUrls: string[] = [];

  readonly uploadsPath = `${environment.apiUrl}`;

  ngOnInit() {
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProduct = result;
      this.bannerProducts.push(...result);
      this.makeBannerUrls();
    });

    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProduct = result;
      this.bannerProducts.push(...result);
      this.makeBannerUrls();
    });
  }

  /** Build full URLs exactly once */
  private makeBannerUrls(): void {
    this.bannerImageUrls = this.bannerProducts
      .map((p) => p.images?.[0]) // adjust if `images` is just a string
      .filter((x): x is string => !!x) // drop null/undefined
      .map((file) => this.uploadsPath + file);
  }
}