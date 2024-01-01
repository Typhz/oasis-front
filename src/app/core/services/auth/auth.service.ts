import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { getDataStorage, setDataStorage } from '../../../shared/utils/storage';
import { AuthResponseModel } from '../../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = new BehaviorSubject<boolean>(true);
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
  ) {}

  public signIn(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseModel>(`${environment.apiUrl}/Customer/sign-in`, data, {
        headers: this.headers,
      })
      .pipe(
        map((response: AuthResponseModel) => {
          this.setToken(response.token);
          this.setIsLogged(true);
          this.reloadSystem();
          return response;
        }),
      );
  }

  public getToken(): string | null {
    const token = getDataStorage('access_token', 'w-auth');
    this.isLogged.next(!!token);
    return token;
  }

  public setToken(token: string): void {
    setDataStorage(token, 'w-auth');
  }

  public setIsLogged(value: boolean): void {
    this.isLogged.next(value);
  }

  public getIsLogged(): boolean {
    return this.isLogged.value;
  }

  public clearAllLocalStorageItems(): void {
    localStorage.clear();
  }

  logout() {
    this.clearAllLocalStorageItems();
    this.reloadSystem();
  }

  private reloadSystem(): void {
    this.ngZone.run(() => {
      window.location.href = '/dashboard';
    });
  }
}
