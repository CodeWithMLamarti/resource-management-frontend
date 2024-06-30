import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../request/RegisterRequest";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  accountForm: FormGroup;
//, private _snackBar: MatSnackBar
  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          formValues.phone,
          formValues.personnel,
          formValues.role
      );
      this.authService.register(registerRequest).subscribe({
        next: res => {
          this.accountForm.reset();
          //this.openSnackBar('Message archived', 'Undo');
        },
        error: err => {}
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
