import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Response} from '../models/Response';
import {Hosts} from '../models/Hosts';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  userApiUrl = 'users';
  loggedUser = new BehaviorSubject<any>({});

  getUser(): Observable<Response> {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));

    return this.http.get<Response>(`${Hosts.API_HOST}/${this.userApiUrl}/about`, {headers});
  }

  loginUser(user): Observable<Response> {
    return this.http.post<Response>(`${Hosts.API_HOST}/${this.userApiUrl}/login`, user);
  }

  registerUser(user): Observable<Response> {
    return this.http.post<Response>(`${Hosts.API_HOST}/${this.userApiUrl}/register`, user);
  }

}
