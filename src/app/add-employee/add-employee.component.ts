import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {DepartmentService} from '../services/department.service';
import {Location} from '@angular/common';
import {Employee} from '../models/Employee';
import {Response} from '../models/Response';
import {Department} from '../models/Department';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private location: Location
  ) {
  }

  employee: Employee;
  department: Department;

  ngOnInit() {
  }


  addEmployee(employeeInfo, departmentName) {
    this.departmentService.getDepartment(departmentName)
      .subscribe((response: Response) => {
        if (response.success) {
          this.department = response.message;
          this.employee = employeeInfo;
          this.employee.department_id = this.department.id;
          this.employeeService.addEmployee(this.employee)
            .subscribe((res: Response) => {
              if (res.success) {
                console.log(res.message);
                this.location.back();
              }
            });
        }
      });
  }

  cancelClick() {
    this.location.back();
  }

}
