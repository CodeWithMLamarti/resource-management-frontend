import { Component, OnInit } from '@angular/core';
import { BreakService } from "../service/break.service";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { Break } from "../request/Break";
import { AuthService } from "../service/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../service/notifications.service";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  breaksList: Break[];
  breaksBeforeFilter: Break[];
  searchInput = "";
  length: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(private breakService: BreakService, private authService: AuthService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.breakService.getAllBreakRequests().subscribe({
      next: res => {
        this.breaksList = res;
        this.breaksBeforeFilter = [...this.breaksList];
        this.length = res.length;
        this.paginate({ previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.length });
      },
      error: err => console.log("breaks-list", err)
    });
  }

  redirectToPage() {
    this.router.navigate(["/historique"]);
  }

  approveBreak(id: number) {

    this.authService.validateToken(localStorage.getItem("authToken")).subscribe({
      next: response => {
        if (response.role === "HR") {
          this.breakService.approveBreakByHR(id).subscribe({
            next: res => {
              this.updateBreakStatus(id, 'APPROVED');
              this.notificationService.showNotification("top", "right", "Demande approuvée avec succès", "success");
              this.redirectToPage();
            },
            error: err => {
              console.log(err);
              this.notificationService.showNotification("top", "right", "une erreur est survenue.", "danger");
            }
          });
        } else if (response.role === "MANAGER") {
          this.breakService.approveBreakByManager(id).subscribe({
            next: res => {
              this.updateBreakStatus(id, 'APPROVED');
              this.notificationService.showNotification("top", "right", "Demande approuvée avec succès", "success")
            },
            error: err => {
              console.log(err);
              this.notificationService.showNotification("top", "right", "une erreur est survenue.", "danger");
            }
          });
        }
      },
      error: err => console.log("something went wrong")
    });
  }

  disapproveBreak(id: number) {
    this.breakService.rejectBreak(id).subscribe({
      next: res => {
        this.updateBreakStatus(id, 'DENIED');
        this.notificationService.showNotification("top", "right", "Demande a été refusée.", "success");
        this.redirectToPage();
      },
      error: err => {
        console.log(err);
        this.notificationService.showNotification("top", "right", "Une erreur est survenue.", "danger");
      }
    });
  }

  updateBreakStatus(id: number, status: string) {
    const index = this.breaksList.findIndex(b => b.id === id);
    if (index !== -1) {
      this.breaksList[index].status = status;
      this.breaksBeforeFilter[index].status = status;
    }
  }

  sortData(sort: Sort) {
    this.breaksList = [...this.breaksBeforeFilter];
    const data = this.breaksList.slice();
    if (!sort.active || sort.direction === '') {
      this.breaksList = data;
      return;
    }

    this.breaksList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'startDate':
          return this.compare(a.startDate, b.startDate, isAsc);
        case 'endDate':
          return this.compare(a.endDate, b.endDate, isAsc);
        case 'reason':
          return this.compare(a.reason, b.reason, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'breakType':
          return this.compare(a.breakType, b.breakType, isAsc);
        case 'user':
          return this.compare(a.user.firstName, b.user.firstName, isAsc); // Compare by user's first name for simplicity
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  searchItem($event: Event) {
    if (this.searchInput.length !== 0) {
      this.breaksList = [...this.breaksBeforeFilter];
      const filteredList = [...this.breaksList.filter(b =>
          b.reason.includes(this.searchInput)
          || b.user.firstName.includes(this.searchInput)
          || b.user.lastName.includes(this.searchInput)
          || b.user.serialNumber.toString().includes(this.searchInput)
          || b.breakType.toString().includes(this.searchInput)
          || b.status.toString().includes(this.searchInput)
      )];
      this.breaksList = [...filteredList];
    } else {
      this.breaksList = [...this.breaksBeforeFilter];
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
    this.breaksList = this.paginate({ previousPageIndex, pageIndex, pageSize, length });
  }

  paginate({ previousPageIndex, pageIndex, pageSize, length }) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return [...this.breaksBeforeFilter].slice(startIndex, endIndex);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'PENDING':
        return 'pending-status';
      case 'APPROVED':
        return 'approved-status';
      case 'DENIED':
        return 'denied-status';
      default:
        return '';
    }
  }
  getTranslatedStatus(status: string) {
    return status === "APPROVED" ? "Approuvée" : status === "DENIED" ? "Refusée" : "En Cours";
  }
  protected readonly localStorage = localStorage;
}
