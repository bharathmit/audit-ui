import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpInterceptor,HttpEvent,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, throwError, observable } from 'rxjs';
import { User } from '../models/user';
import { map} from 'rxjs/operators';
import { catchError} from 'rxjs/operators';
import {isNullOrUndefined, error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private baseUrl = 'https://audit-api-service.herokuapp.com/';

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }
    





 
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
   }

   authenticate(login: Object): Observable<Object> {
    return this.http.post<any>(`${this.baseUrl}`+"login/authenticate", login)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  activate(emailId: string): Observable<any> {
    let params = new HttpParams().set('emailId', emailId);
    return this.http.get(`${this.baseUrl}account/activation`,{ params: params });
  }

  emailverify(token: string): Observable<any> {
    // Setup log namespace query parameter
    let params = new HttpParams().set('token', token);
   return this.http.get(`${this.baseUrl}account/confirm-account`,{ params: params })
   .pipe(
     catchError(this.handleError))
  }
 

 forgot(emailId: string): Observable<any> {
  // Setup log namespace query parameter
  let params = new HttpParams().set('emailId', emailId);
 return this.http.get(`${this.baseUrl}account/forgot-password`,{ params: params });
}

 passwordverify(token: string): Observable<any> {
  // Setup log namespace query parameter
  let params = new HttpParams().set('token', token);
 return this.http.get(`${this.baseUrl}account/confirm-password`,{ params: params });
}

 passwordcreate(password: string,emailId: string): Observable<any> {
  // Initialize Params Object
  let params = new HttpParams();
  // Begin assigning parameters
  params = params.append('password', password);
  params = params.append('emailId', emailId);
  
  return this.http.put(`${this.baseUrl}account/password-creation`,null,{ params: params });
}

 handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

}
