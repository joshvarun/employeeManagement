import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/models/Employee";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    joinedOn: ""
  };

  constructor() {}

  ngOnInit() {}
}
