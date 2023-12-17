import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MyServiceNameService {

  private readonly url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.url}/products`,);
  }
  addProduct(formData:any): Observable<any> {
    console.log(formData,"reching here")
    return this.http.post<any>(`${this.url}/add-products`,formData);
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
