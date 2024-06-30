import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {NgOptimizedImage} from "@angular/common";
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ComponentsModule} from "./components/components.module";
import { UsersListComponent } from './users-list/users-list.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        NgOptimizedImage,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AccessDeniedComponent,
    SignUpComponent,
    UsersListComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
