import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Break} from "../request/Break";
import {UserService} from "../service/user.service";
import {BreakService} from "../service/break.service";
import {UserDto} from "../response/UserDto";
import {NotificationsService} from "../service/notifications.service";

@Component({
  selector: 'app-days-off',
  templateUrl: './days-off.component.html',
  styleUrls: ['./days-off.component.css']
})
export class DaysOffComponent implements OnInit {
  leaveForm: FormGroup;
  minDate: Date;
  user: UserDto;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private breakService: BreakService,
      private notificationsService: NotificationsService
  ) {
    this.minDate = new Date(); // La date d'aujourd'hui
  }

  ngOnInit(): void {
    this.userService.getUser(+localStorage.getItem("id")).subscribe({
      next: res => {
        this.user = res;
        this.leaveForm.patchValue({
          solde: res.balance
        });
        this.leaveForm.value.solde = res.balance;
        console.log("from days-off", res)
      },
      error: err => console.log(err)
    })
    this.leaveForm = this.fb.group({
      dateDepart: ['', [Validators.required, this.dateValidator.bind(this)]],
      dateArrivee: ['', [Validators.required, this.dateValidator.bind(this)]],
      typeConge: ['', Validators.required],
      motifConge: ['', Validators.required],
      solde: [{ value: 30, disabled: true }, Validators.required] // Exemple de solde fixe
    }, { validator: this.dateRangeValidator });
  }

  dateValidator(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    if (selectedDate < this.minDate) {
      return { 'invalidDate': true };
    }
    return null;
  }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const dateDepart = group.get('dateDepart').value;
    const dateArrivee = group.get('dateArrivee').value;

    if (dateDepart && dateArrivee && new Date(dateDepart) > new Date(dateArrivee)) {
      return { 'invalidDateRange': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const formData = this.leaveForm.value;
      console.log('Form Data:', formData);
      const aBreak = new Break(
          this.leaveForm.value.dateDepart,
          this.leaveForm.value.dateArrivee,
          this.leaveForm.value.motifConge,
          "PENDING",
          this.user,
          this.leaveForm.value.typeConge
      );
      this.breakService.requestBreak(aBreak).subscribe({
        next: res=>
      this.notificationsService.showNotification(
          "top",
          'right',
          'Votre demande a été bien effectuer',
          'success'
      ),
        error: err => this.notificationsService.showNotification(
            "top",
            'right',
            'Une erreur est survenue',
            'danger'
        ),
    })} else {
      this.notificationsService.showNotification("top", 'right', 'Les informations sont invalid', 'danger')
    }
  }
}
