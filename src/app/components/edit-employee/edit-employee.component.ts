import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from 'src/app/models/Employee';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id: string;
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: ''
  };
  idParam = 'id';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params[this.idParam];
    this.employeeService.getEmployee(this.id).subscribe(employee => {
      console.log(employee);
      if (employee != null) {
        this.employee = employee;
      } else {
        console.log('Employee not found');
      }
    });
  }

  onSubmit({ value, valid }: { value: Employee; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly!', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } else {
      value.id = this.id;
      this.employeeService.updateEmployee(value);
      this.flashMessage.show('Employee has been updated!', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/employee/' + this.id]);
    }
  }
}
