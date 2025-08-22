import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CustomerService } from '../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, FormsModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownOpen = false;
  authService = inject(AuthService);
  searchTerm: string | undefined;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // implement logout logic
    console.log('Logged out');
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  categoryService = inject(CategoryService);
  customerService = inject(CustomerService);
  category: Category[] = [];
  ngOnInit() {
    this.customerService.getCategory().subscribe((res) => {
      this.category = res;
      console.log(this.category);
    });
  }
  router = inject(Router);
  onSearch(e: any) {
    console.log(e.target.value);
    if (e.target.value) {
      this.router.navigateByUrl('/products?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigateByUrl('/products?categoryId=' + id!);
  }
}
