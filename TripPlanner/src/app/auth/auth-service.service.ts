import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceToken {
  constructor() {}
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(localStorage.getItem('access_token'));

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  clearToken(): void {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }
}
