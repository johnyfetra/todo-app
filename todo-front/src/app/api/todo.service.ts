import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todo, TodoCreate } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class ApiTodoService {
  private base = `${environment.apiUrl}/todos`;
  constructor(private http: HttpClient) {}

  list(params?: { done?: boolean }) {
    return this.http.get<Todo[]>(this.base, { params: params as any });
  }
  create(data: TodoCreate) {
    return this.http.post<Todo>(this.base, data);
  }
  update(id: number, patch: Partial<Todo>) {
    return this.http.patch<Todo>(`${this.base}/${id}`, patch);
  }
  remove(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
