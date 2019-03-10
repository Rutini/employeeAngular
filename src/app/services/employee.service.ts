import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '../models/Response';
import {Hosts} from '../models/Hosts';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) {
  }

  employeeApiUrl = 'employees';

  getAllEmployees(): Observable<Response> {
    return this.http.get<Response>(`${Hosts.API_HOST}/${this.employeeApiUrl}`);
  }

  getEmployeeById(id): Observable<Response> {
    return this.http.get<Response>(`${Hosts.API_HOST}/${this.employeeApiUrl}/${id}`);
  }

  addEmployee(employee): Observable<Response> {
    return this.http.post<Response>(`${Hosts.API_HOST}/${this.employeeApiUrl}`, employee);
  }

  updateEmployeeById(id, employee): Observable<Response> {
    return this.http.put<Response>(`${Hosts.API_HOST}/${this.employeeApiUrl}/${id}`, employee);
  }

  deleteEmployeeById(id): Observable<Response> {
    return this.http.delete<Response>(`${Hosts.API_HOST}/${this.employeeApiUrl}/${id}`);
  }

}
