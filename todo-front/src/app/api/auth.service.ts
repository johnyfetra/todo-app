import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ApiAuthService {
  private base = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  register(body: { email: string; password: string }) {
    return this.http.post<{ id: number; email: string }>(`${this.base}/register`, body);
  }

  login(body: { email: string; password: string }) {
    return this.http.post<{ access_token: string; token_type: string }>(`${this.base}/login`, body);
  }

  me() {
    return this.http.get<{ id: number; email: string }>(`${this.base}/me`);
  }
}
