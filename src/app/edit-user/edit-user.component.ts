import { Component, OnInit } from '@angular/core';
import {UserDto} from "../response/UserDto";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {RegisterRequest} from "../request/RegisterRequest";
import {UserUpdateDto} from "../response/UserUpdateDto";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserDto;

  accountForm: FormGroup;
//, private _snackBar: MatSnackBar
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private userService: UserService,
      private activatedRoute: ActivatedRoute
  ) {
    this.accountForm = this.fb.group({
      nom: [''],
      prenom: [''],
      matricule: [''],
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      telephone: [''],
      personnel: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params["id"];
    this.userService.getUser(id).subscribe({
      next: res => {
        this.user = res;
      },
      error: err => console.log(err)
    })
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formValues = this.accountForm.value;
      const updateRequest = new UserUpdateDto(
          this.user.id,
          formValues.nom ? formValues.nom : null,
          formValues.prenom ? formValues.prenom : null,
          formValues.matricule ? formValues.matricule : null,
          formValues.email ? formValues.email : null,
          formValues.password ? formValues.password : null,
          formValues.telephone ? formValues.telephone : null,
          formValues.personnel ? formValues.personnel : null,
          formValues.role ? formValues.role : null
      );
      this.userService.updateUser(updateRequest).subscribe({
        next: res => console.log("updated successfully"),
        error: err => console.log(err)
      })
      console.log(updateRequest);
      //console.log('Form Submitted!', this.accountForm.value);
    } else {
      console.log('Form not valid');
    }
  }

}
