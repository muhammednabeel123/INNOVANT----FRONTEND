import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Product } from './interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class MyServiceNameService {

  private readonly url = 'https://backend-zaht.onrender.com/'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products`,);
  }
  addProduct(formData:FormData): Observable<Product> {
    console.log(formData,"reching here")
    return this.http.post<Product>(`${this.url}/add-products`,formData);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${id}`);
  }
  getProductsById(id:number | undefined):Observable<any>{
    return this.http.get<any>(`${this.url}/products/${id}`,);
  }
  deleteProductImage(productId: number|undefined, imageId: number | string): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${productId}/images/${imageId}`);
  }
  editProductById(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/edit-products/${id}`,formData);
  }

}
