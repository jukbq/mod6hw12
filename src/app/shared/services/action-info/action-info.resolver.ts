import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionResponse } from '../../interfaces/action';

@Injectable({
  providedIn: 'root'
})


export class ActionInfoResolver implements Resolve<ActionResponse> {

  private url: any = 'https://busy-stitch-archer.glitch.me';
  private api = { good: `${this.url}/action` };

  constructor(
    private hhtpClient: HttpClient
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActionResponse> {
    return this.hhtpClient.get<ActionResponse>(`${this.api.good}/${route.paramMap.get('id')}`);
  }
}
