import {User} from '../models/user.model';
import {StorageService} from "ngx-webstorage-service";
import {catchError, map} from "rxjs/operators";
import {UtilitiesService} from "../helpers/utilities.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from "rxjs";

const STORAGE_KEY = 'current-user';
export const USER_SERVICE_STORAGE = new InjectionToken<StorageService>('USER_SERVICE_STORAGE');

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    public loggedInUser$: Observable<User>;
    private loggedInUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient,
                private utils: UtilitiesService,
                @Inject(USER_SERVICE_STORAGE) private storage: StorageService) {
        this.loggedInUserSubject = new BehaviorSubject<User>(this.getUserFromStorage());
        this.loggedInUser$ = this.loggedInUserSubject.asObservable();
    }

    public setLoggedUser(loggedUser: User): void {
        this.storage.set(STORAGE_KEY, loggedUser);
        this.loggedInUserSubject.next(this.getUserFromStorage());
    }

    public getLoggedUser(): User {
        return this.loggedInUserSubject.value;
    }

    validateSession(): Observable<any> {
        return this.http.get<any>(
            this.utils.getAuthApi("validate-session")
        ).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return of(error);
            })
        );
    }

    register(user: User): Observable<any> {
        return this.authenticate(user, "register");
    }

    login(user: User): Observable<any> {
        return this.authenticate(user, "login");
    }

    logout(): Observable<any> {
        this.setLoggedUser(null);
        
        return this.http.get<any>(
            this.utils.getAuthApi("logout")
        ).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return of(error);
            })
        );
    }

    private authenticate(user: User, url: string) {
        return this.http.post(
            this.utils.getAuthApi(url), JSON.stringify(user), {headers: this.headers}
        ).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    private getUserFromStorage(): User {
        const currentUser: User = this.storage.get(STORAGE_KEY) || null;
        return currentUser;
    }
}
