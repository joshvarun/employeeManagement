import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeDoc: AngularFirestoreDocument;
  employeeCollection: AngularFirestoreCollection;
  employees: Observable<Employee[]>;
  employee: Observable<Employee>;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private afs: AngularFirestore) {
    this.employeeCollection = afs.collection('employees', ref =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getEmployees(): Observable<Employee[]> {
    this.employees = this.employeeCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Employee;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.employees;
  }

  newEmployee(employee: Employee) {
    const date = new Date();
    employee.joinedOn = date.getDate() + ' ' + this.months[date.getMonth()] + ', ' + date.getFullYear() ;
    this.employeeCollection.add(employee);
  }

  updateEmployee(employee: Employee) {
    this.employeeDoc.update(employee);
  }

  deleteEmployee() {
    this.employeeDoc.delete();
  }

  getEmployee(id: string): Observable<Employee> {
    this.employeeDoc = this.afs.doc<Employee>(`employees/${id}`);
    this.employee = this.employeeDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Employee;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.employee;
  }
}
