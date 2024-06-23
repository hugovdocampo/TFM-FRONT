import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageSubject = new BehaviorSubject<string | null>(localStorage.getItem('travelId'));

  constructor() {
    fromEvent(window, 'storage').subscribe(() => {
      this.storageSubject.next(localStorage.getItem('travelId'));
    });
  }

  watchStorage(): BehaviorSubject<string | null> {
    return this.storageSubject;
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.storageSubject.next(localStorage.getItem(key));
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}