import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'access_token';

  setToken(token: string) { localStorage.setItem(this.key, token); }
  getToken(): string | null { return localStorage.getItem(this.key); }
  clear() { localStorage.removeItem(this.key); }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || '')) as { exp?: number };
      if (!payload?.exp) return true;
      const nowSeconds = Math.floor(Date.now() / 1000);
      return payload.exp <= nowSeconds;
    } catch {
      return true;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (this.isTokenExpired(token)) {
      this.clear();
      return false;
    }
    return true;
  }
}
