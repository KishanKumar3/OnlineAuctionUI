import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddedProductsComponent } from './components/added-products/added-products.component';
import { BoughtProductsComponent } from './components/bought-products/bought-products.component';
import { MyBidsComponent } from './components/my-bids/my-bids.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'added-products', component: AddedProductsComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'bought-products', component: BoughtProductsComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'my-bids', component: MyBidsComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'admin/products', component: ProductListComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'admin/users', component: UserListComponent, canActivate: [AuthGuard] }, // Protected route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
