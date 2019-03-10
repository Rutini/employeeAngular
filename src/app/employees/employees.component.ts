import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/Employee';
import {Response} from '../models/Response';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService
  ) {
  }

  employees: Employee[];
  foundEmployees = [];
  constantEmployees: Employee[];
  pageOfEmployees: Employee[];

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe((response: Response) => {
        if (response.success) {
          this.employees = response.message;
          this.constantEmployees = this.employees;
        }
      });
  }


  deleteEmployee(employee): void {
    const id = employee.id;
    this.employeeService.deleteEmployeeById(id)
      .subscribe((response: Response) => {
        if (response.success) {
          console.log(response.message);
          this.employees = this.employees.filter(e => e !== employee);
        }
      });
  }

  searchEmployees(inputName: string) {
    this.employees = this.constantEmployees;
    this.foundEmployees = [];
    this.employees.forEach((employee) => {
      if (employee.name.startsWith(inputName)) {
        this.foundEmployees.push(employee);
      }
    });
    this.employees = this.foundEmployees;
  }

  onChangePage(pageOfEmployees) {
    this.pageOfEmployees = pageOfEmployees;
  }

}
