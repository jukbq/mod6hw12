import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsRequest, GoodsResponse } from '../../interfaces/goods';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private goodsArr: Array<GoodsResponse> = [];

  private url: any = 'https://busy-stitch-archer.glitch.me';
  private api = { good: `${this.url}/goods` };



  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<GoodsResponse[]> {
    return this.http.get<GoodsResponse[]>(this.api.good );

  };


  getAllByComponent(name: string): Observable<GoodsResponse[]> {
    return this.http.get<GoodsResponse[]>(`${this.api.good}?component.titel=${name}`);
  }

  getOne(id: number): Observable<GoodsResponse> {
    return this.http.get<GoodsResponse>(`${this.api.good}/${id}`);
  }

  addGood(goods: GoodsRequest): Observable<GoodsResponse> {
    return this.http.post<GoodsResponse>(this.api.good, goods);
  };


  editGood(goods: GoodsRequest, id: number): Observable<GoodsResponse> {
    return this.http.patch<GoodsResponse>(`${this.api.good}/${id}`, goods);
  };


  delGood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.good}/${id}`);
  }; 



}
