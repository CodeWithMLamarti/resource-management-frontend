import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../request/RegisterRequest";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationsService} from "../service/notifications.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  accountForm: FormGroup;
//, private _snackBar: MatSnackBar
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private notificationsService: NotificationsService
  ) {
    this.accountForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', Validators.required],
      personnel: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formValues = this.accountForm.value;
      const registerRequest = new RegisterRequest(
          formValues.nom,
          formValues.prenom,
          formValues.matricule,
          formValues.email,
          formValues.password,
          formValues.telephone,
          formValues.personnel,
          formValues.role
      );
      this.authService.register(registerRequest).subscribe({
        next: res => {
          this.accountForm.reset();
          this.notificationsService.showNotification("top", 'right', "L'utilisateur a été crée avec succès", 'success')
        },
        error: err => {this.notificationsService.showNotification("top", 'right', "Une erreur est survenue.", 'danger')}
      })
      //console.log('Form Submitted!', this.accountForm.value);
    } else {
      console.log('Form not valid');
    }
  }

/*
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

 */




}
