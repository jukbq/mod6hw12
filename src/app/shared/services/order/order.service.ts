import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { OrderRequest, OrderResponse } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public chageBasket = new Subject<boolean>;



  private url: any = 'https://busy-stitch-archer.glitch.me';
  private api = { order: `${this.url}/order` };

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.api.order);
  }


  getGoodOrder(): Observable<OrderRequest[]> {
    return this.http.get<OrderRequest[]>(this.api.order );
  }


  addOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.api.order, order);
  };

  delOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.order}/${id}`);
  }; 


}
