import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

const MOCK_PATIENT_USER: User = {
  _id: 'user_patient_1',
  email: 'patient@tammeni.com',
  role: 'patient'
};

const MOCK_DOCTOR_USER: User = {
  _id: 'user_doctor_1',
  email: 'doctor@tammeni.com',
  role: 'doctor'
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) localStorage.setItem('token', response.token);
        if (response.role) localStorage.setItem('role', response.role);
        if (response.user) localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(this.getUserFromStorage());
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        const user: User = response.user || {
          _id: response._id,
          email: response.email,
          role: response.role
        };
        const token = response.token;
        if (token) localStorage.setItem('token', token);
        if (response.role) localStorage.setItem('role', response.role);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('patient_profile');
    localStorage.removeItem('doctor_profile');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value || this.getUserFromStorage();
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        // ignore
      }
    }

    const token = this.getToken();
    if (!token) return null;

    try {
      if (token.startsWith('mock_token_')) {
        return MOCK_PATIENT_USER;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId || payload.id;
      return { _id: userId, email: payload.email, role: payload.role };
    } catch (e) {
      return null;
    }
  }
}
