import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { EmployeeService } from "./services/employee.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    EmployeesComponent,
    SidebarComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "employeeManagement"),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
