import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, throwError, observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { isNullOrUndefined, error } from 'util';
import { Login } from '../../models/login';
import { UserDetails } from 'src/app/models/userDetails';
import { AddUser } from 'src/app/models/addUser';
import { DelUser } from 'src/app/models/delUser';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
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

    authenticate(login: any): Observable<any> {

        return this.http.post<any>(this.baseUrl + 'login/authenticate', login).pipe(
            map(
                (user) => {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;

                }              

            ))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    activate(emailId: string): Observable<any> {
        let params = new HttpParams().set('emailId', emailId);
        return this.http.get(`${this.baseUrl}account/activation`, { params: params });
    }

    emailverify(token: string): Observable<any> {
        // Setup log namespace query parameter
        let params = new HttpParams().set('token', token);
        return this.http.get(`${this.baseUrl}account/confirm-account`, { params: params })    };



    forgot(emailId: string): Observable<any> {
        // Setup log namespace query parameter
        let params = new HttpParams().set('emailId', emailId);
        return this.http.get(`${this.baseUrl}account/forgot-password`, { params: params })
            // .pipe(
            //     catchError(this.handleError));
    }

    passwordverify(token: string): Observable<any> {
        // Setup log namespace query parameter
        let params = new HttpParams().set('token', token);
        return this.http.get(`${this.baseUrl}account/confirm-password`, { params: params });
    }

    passwordcreate(password: string, emailId: string): Observable<any> {
        // Initialize Params Object
        let params = new HttpParams();
        // Begin assigning parameters
        params = params.append('password', password);
        params = params.append('emailId', emailId);

        return this.http.put(`${this.baseUrl}account/password-creation`, null, { params: params });

    }

    // listUsers

    getUsers(user: User): Observable<any> {

        return this.http.post(this.baseUrl + 'user/list', user)
    }

     // getUsersByEmail

     getUsersByEmail(emailId: Object): Observable<any> {

        return this.http.post(this.baseUrl + 'user/list', emailId)
    }


    // updateUsers
    updateUser(userDetails:UserDetails): Observable<any>{


        return this.http.put(this.baseUrl + 'user',userDetails);
    }

    // addUsers
    addUsers(addUserNew:AddUser):Observable<any>{
        return this.http.post(this.baseUrl+"user",addUserNew);
    }

    //delUsers

    delUsers(delUsers: DelUser): Observable<any>{
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {
                emailId: delUsers.emailId,
                firstName: delUsers.firstName,
                mobile: delUsers.mobile,
                gstpNumber: delUsers.gstpNumber
            },
          };
          
        return this.http.delete(this.baseUrl+'user/delete',options);
    }

    // Error Handling

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
