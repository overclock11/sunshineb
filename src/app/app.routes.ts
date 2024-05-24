import { Routes } from '@angular/router';
import {AddProductsComponent} from "./add-products/add-products.component";
import {ListProductsComponent} from "./list-products/list-products.component";

export const routes: Routes = [
  {
    path: '',
    component: AddProductsComponent
  },
  {
    path: 'list',
    component: ListProductsComponent
  }
];
