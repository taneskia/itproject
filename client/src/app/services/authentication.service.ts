import { User } from '../models/user.model';
import { StorageService } from 'ngx-webstorage-service';
import { catchError, map } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { AuthenticateRequest } from '../models/authenticate-request.model';
import { CookieService } from 'ngx-cookie-service';

const STORAGE_KEY = 'current-user';
export const USER_SERVICE_STORAGE = new InjectionToken<StorageService>(
  'USER_SERVICE_STORAGE'
);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public loggedInUser$: Observable<User>;
  private loggedInUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private utils: UtilitiesService,
    private cookieService: CookieService,
    @Inject(USER_SERVICE_STORAGE) private storage: StorageService
  ) {
    if (!this.storage.get(STORAGE_KEY)) this.storage.set(STORAGE_KEY, null);
    this.loggedInUserSubject = new BehaviorSubject<User>(
      this.getUserFromStorage()
    );
    this.loggedInUser$ = this.loggedInUserSubject.asObservable();
  }

  public setLoggedUser(loggedUser: any): void {
    this.storage.set(STORAGE_KEY, loggedUser);

    if (this.cookieService.check('refreshToken'))
      this.cookieService.delete('refreshToken');

    if (loggedUser)
      this.cookieService.set('refreshToken', loggedUser['refreshToken'], {
        secure: false,
      });

    this.loggedInUserSubject.next(this.getUserFromStorage());
  }

  public getLoggedUser(): User {
    return this.loggedInUserSubject.value;
  }

  public getToken() {
    return this.storage.get(STORAGE_KEY) !== null
      ? this.storage.get(STORAGE_KEY)['jwtToken']
      : undefined;
  }

  async validateToken() {
    const response = await this.authApiPost(
      this.getLoggedUser(),
      'refresh-token'
    );
    return response;
  }

  async register(req: RegisterRequest) {
    const response = await this.authApiPost(req, 'register');
    return response;
  }

  async login(req: AuthenticateRequest) {
    const response = await this.authApiPost(req, 'authenticate');
    return response;
  }

  async logout() {
    const response = await this.http
      .get(this.utils.getAuthApi('revoke-token'))
      .toPromise();
    return response;
  }

  private async authApiPost(req: any, url: string) {
    const response = await this.http
      .post(this.utils.getAuthApi(url), JSON.stringify(req))
      .toPromise();
    return response;
  }

  private getUserFromStorage(): User {
    const currentUser: User = this.storage.get(STORAGE_KEY) || null;
    return currentUser;
  }
}
