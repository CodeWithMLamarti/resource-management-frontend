import { Component, OnInit } from '@angular/core';
import {UserDto} from "../response/UserDto";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocService} from "../service/doc.service";
import {DocDto} from "../request/DocDto";
import {NotificationsService} from "../service/notifications.service";

@Component({
  selector: 'app-docs-request',
  templateUrl: './docs-request.component.html',
  styleUrls: ['./docs-request.component.css']
})
export class DocsRequestComponent implements OnInit {

  user: UserDto | null = null;
  accountForm: FormGroup;

  constructor(private userService: UserService, private authService: AuthService, private docService: DocService, private notificationService: NotificationsService,private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      selectedDocument: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.authService.validateToken(localStorage.getItem("authToken")).subscribe(user => {
      if(user.id != null) {
        this.userService.getUser(user.id).subscribe(res => {
          this.user = res;
        })
      }
    });
  }

  submitRequest(): void {
    if (this.accountForm.value.selectedDocument) {
      console.log(this.user);
      const doc = new DocDto(this.accountForm.value.selectedDocument, this.user);
      this.docService.docRequest(doc).subscribe({
        next: res => {
          this.notificationService.showNotification("top", "right", "Votre demande du document envoyée avec succès", "success");
        },
        error: err => this.notificationService.showNotification("top", "right", "Une erreur est survenue", "danger")
      })
      console.log('Requesting document of type:', this.accountForm.value.selectedDocument);
    }
  }

}
