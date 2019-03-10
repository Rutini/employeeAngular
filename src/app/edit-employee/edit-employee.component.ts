import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/Employee';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../models/Response';
import {Department} from '../models/Department';
import {DepartmentService} from '../services/department.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  employee: Employee;
  newEmployee: Employee;
  department: Department;

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.employeeService.getEmployeeById(id)
      .subscribe((response: Response) => {
        if (response.success) {
          this.employee = response.message;
          this.newEmployee = JSON.parse(JSON.stringify(this.employee));
        }
      });
  }

  editEmployee(departmentName) {
    this.employee = JSON.parse(JSON.stringify(this.newEmployee));
    this.departmentService.getDepartment(departmentName)
      .subscribe((response: Response) => {
        if (response.success) {
          this.department = response.message;
          this.employee.department_id = this.department.id;
          this.employeeService.updateEmployeeById(this.employee.id, this.employee)
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
    this.newEmployee = JSON.parse(JSON.stringify(this.employee));
    this.location.back();
  }
}
