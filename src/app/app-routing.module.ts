import { ViewProductComponent } from './product/view-product/view-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';

const routes: Routes = [{
    path: '', 
    component: ViewProductComponent 
},
{
  path: 'add-product', 
  component: AddProductComponent 
},{
  path: 'edit-product', 
  component: EditProductComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
