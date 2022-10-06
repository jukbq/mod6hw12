import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GoodsResponse } from '../../interfaces/goods';

@Injectable({
  providedIn: 'root'
})
export class GoodsInfoResolver implements Resolve<GoodsResponse> {

  private url: any = 'https://busy-stitch-archer.glitch.me';
  private api = { good: `${this.url}/goods` };


constructor(
  private hhtpClient: HttpClient
){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GoodsResponse> {
    return this.hhtpClient.get<GoodsResponse>(`${this.api.good}/${route.paramMap.get('id')}`);
  }
}
