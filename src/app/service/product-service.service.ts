import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  http = inject(HttpClient);
  constructor() {}
  private base = environment.apiUrl + '/product';

  /** CREATE -------------------------------------------------------- */
  addProduct(fd: FormData) {
    return this.http.post(this.base, fd); // <-- fd, not model
  }

  /** UPDATE -------------------------------------------------------- */
  updateProduct(id: string, fd: FormData) {
    return this.http.put(`${this.base}/${id}`, fd); // <-- fd, not model
  }

  /** READ helpers (unchanged) ------------------------------------- */
  getProductById(id: string) {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  getProducts() {
    return this.http.get<Product[]>(this.base);
  }
  deleteProduct(id: string) {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
