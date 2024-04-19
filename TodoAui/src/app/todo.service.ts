import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:5235/api/todo';
  
  constructor(
    private http: HttpClient
  ) { }

  public create(todo: Todo): Observable<Todo> {
    console.log('calling api to create todo:');
    console.log(todo);
    console.log(`url: ${this.baseUrl}`);
    return this.http.post<Todo>(this.baseUrl, todo, httpOptions);
  }

  public retrieveById(id: number) : Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  public retrieveAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  public retrieveActive(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/active`);
  }

  public retrieveDone(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/done`);
  }

  public update(todo: Todo): Observable<Todo> {
    console.log('calling api to update todo:');
    console.log(todo);
    console.log(`url: ${this.baseUrl}/${todo.id}`)
    return this.http.put<Todo>(`${this.baseUrl}/${todo.id}`, todo, httpOptions);
  }

  public delete(id: number): Observable<number> {
    console.log('calling api to delete todo:');
    console.log(id);
    console.log(`url: ${this.baseUrl}/${id}`);
    return this.http.delete<number>(`${this.baseUrl}/${id}`);
  }
}
