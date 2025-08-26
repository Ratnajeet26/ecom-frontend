import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoriesFormComponent } from './components/manage/categories-form/categories-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandsFormComponent } from './components/manage/brands-form/brands-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductsFormComponent } from './components/manage/products-form/products-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { DashboardComponent } from './components/manage/dashboard/dashboard.component';
import { adminGuard } from './core/admin-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomersOrdersComponent } from './components/customers-orders/customers-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    component: CategoriesFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/:id',
    component: CategoriesFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand',
    component: BrandsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand/add',
    component: BrandsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand/:id',
    component: BrandsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/add',
    component: ProductsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard],
  },
   {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
   {
    path: 'orders',
    component: CustomersOrdersComponent,
    canActivate: [authGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
