import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  id: string;
  employee: Employee;
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

  onDeleteClick() {
    if (
      confirm(
        'Are you sure you want to delete ' +
          this.employee.firstName +
          ' ' +
          this.employee.lastName +
          '?'
      )
    ) {
      this.employeeService.deleteEmployee();
      this.flashMessage.show('Employee deleted!', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
