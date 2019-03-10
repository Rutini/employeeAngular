import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/Response';
import {Hosts} from '../models/Hosts';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) {
  }

  departmentApiUrl = 'departments';

  getDepartment(name): Observable<Response> {
    return this.http.get<Response>(`${Hosts.API_HOST}/${this.departmentApiUrl}/${name}`);
  }

}
