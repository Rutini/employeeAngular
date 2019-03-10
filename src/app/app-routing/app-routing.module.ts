import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeesComponent} from '../employees/employees.component';
import {EditEmployeeComponent} from '../edit-employee/edit-employee.component';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';

const routes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: 'edit/:id', component: EditEmployeeComponent},
  {path: 'create', component: AddEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
