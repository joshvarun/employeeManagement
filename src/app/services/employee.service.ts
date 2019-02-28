import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Employee } from "../models/Employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  employeeDoc: AngularFirestoreDocument;
  employeeCollection: AngularFirestoreCollection;
  employees: Observable<Employee[]>;
  employee: Observable<Employee>;

  constructor(private afs: AngularFirestore) {
    this.employeeCollection = afs.collection("employees", ref =>
      ref.orderBy("lastName", "asc")
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
}
