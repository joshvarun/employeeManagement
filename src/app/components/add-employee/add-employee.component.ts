import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    joinedOn: ''
  };

  @ViewChild('employeeForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Employee; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please check your form entries', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } else {
      this.employeeService.newEmployee(value);
      this.flashMessage.show('New Employee Added', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
