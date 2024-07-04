import { Component, OnInit } from '@angular/core';
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import {DocDto} from "../../request/DocDto";
import {AuthService} from "../../service/auth.service";
import {NotificationsService} from "../../service/notifications.service";
import {DocService} from "../../service/doc.service";

@Component({
  selector: 'app-document-request-list',
  templateUrl: './document-request-list.component.html',
  styleUrls: ['./document-request-list.component.css']
})
export class DocumentRequestListComponent implements OnInit {
  documentRequestsList: DocDto[];
  documentRequestsBeforeFilter: DocDto[];
  searchInput = "";
  length: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(
      private documentRequestService: DocService,
      private authService: AuthService,
      private router: Router,
      private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.documentRequestService.getAllDocs().subscribe({
      next: res => {
        this.documentRequestsList = res;
        this.documentRequestsBeforeFilter = [...this.documentRequestsList];
        this.length = res.length;
        this.paginate({ previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.length });
      },
      error: err => console.log("document-request-list", err)
    });
  }

  sortData(sort: Sort) {
    this.documentRequestsList = [...this.documentRequestsBeforeFilter];
    const data = this.documentRequestsList.slice();
    if (!sort.active || sort.direction === '') {
      this.documentRequestsList = data;
      return;
    }

    this.documentRequestsList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'requestDate':
          return this.compare(a.requestedAt, b.requestedAt, isAsc);
        case 'documentType':
          return this.compare(a.docType, b.docType, isAsc);
        case 'user':
          return this.compare(a.user.firstName, b.user.firstName, isAsc); // Compare by user's first name for simplicity
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  searchItem($event: Event) {
    if (this.searchInput.length !== 0) {
      this.documentRequestsList = [...this.documentRequestsBeforeFilter];
      const filteredList = this.documentRequestsList.filter(req =>
          req.docType.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          req.user.firstName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          req.user.lastName.toLowerCase().includes(this.searchInput.toLowerCase())
      );
      this.documentRequestsList = [...filteredList];
    } else {
      this.documentRequestsList = [...this.documentRequestsBeforeFilter];
    }
  }

  handlePageEvent($event: PageEvent) {
    this.length = $event.length;
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    const previousPageIndex = $event.previousPageIndex;
    const pageIndex = $event.pageIndex;
    const pageSize = $event.pageSize;
    const length = $event.length;
    this.documentRequestsList = this.paginate({ previousPageIndex, pageIndex, pageSize, length });
  }

  paginate({ previousPageIndex, pageIndex, pageSize, length }) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return this.documentRequestsBeforeFilter.slice(startIndex, endIndex);
  }

  deleteRequest(requestId: number) {
    this.documentRequestService.deleteRequest(requestId).subscribe(() => {
      this.documentRequestsList = this.documentRequestsList.filter(request => request.id !== requestId);
      this.documentRequestsBeforeFilter = this.documentRequestsBeforeFilter.filter(request => request.id !== requestId);
      this.length--;
      this.notificationService.showNotification("top", "right", "Demande supprimée avec succès", "success");
    }, error => {
      console.log(error);
      this.notificationService.showNotification("top", "right", "Une erreur est survenue.", "danger");
    });
  }

  protected readonly localStorage = localStorage;
}
