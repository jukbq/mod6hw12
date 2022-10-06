import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentsResponse, CopmponentsRequest } from '../../interfaces/components';



@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  private commentsArr: Array<ComponentsResponse> = [];



  private url: any = 'https://busy-stitch-archer.glitch.me';
  private api = { comment: `${this.url}/comments` };

  

  constructor(private http: HttpClient) { }

  getAll(): Observable<ComponentsResponse[]> {
    return this.http.get<ComponentsResponse[]>(this.api.comment);
  };

  getAllByComponent(name: string): Observable<ComponentsResponse[]> {
    return this.http.get<ComponentsResponse[]>(`${this.api.comment}?comments.link=${name}`);
  }

  addAction(comment: CopmponentsRequest): Observable<ComponentsResponse> {
    return this.http.post<ComponentsResponse>(this.api.comment, comment);
   
  };


  editAction(comment: CopmponentsRequest, id: number): Observable<ComponentsResponse> {
    return this.http.patch<ComponentsResponse>(`${this.api.comment}/${id}`, comment);
  };

  delAction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.comment}/${id}`);
  }; 



}
