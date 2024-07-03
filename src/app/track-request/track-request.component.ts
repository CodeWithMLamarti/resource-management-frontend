import { Component, OnInit } from '@angular/core';
import {BreakService} from "../service/break.service";
import {AuthService} from "../service/auth.service";
import {Break} from "../request/Break";
import {Router} from "@angular/router";
import {NotificationsService} from "../service/notifications.service";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.css']
})
export class TrackRequestComponent implements OnInit {
  breaksList: Break[];
  breaksBeforeSort: Break[];
  userId: number;

  constructor(private breakService: BreakService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateToken(localStorage.getItem("authToken")).subscribe(user => {
      this.userId = user.id;
      this.loadBreaks();
    });
  }

  loadBreaks(): void {
    this.breakService.getBreaksByUserId(this.userId).subscribe({
      next: breaks => {
        this.breaksList = breaks;
        this.breaksBeforeSort = [...breaks];
      },
      error: err => console.log('Error loading breaks', err)
    });
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.breaksList = this.breaksBeforeSort;
      return;
    }

    this.breaksList = this.breaksList.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'startDate':
          return this.compare(new Date(a.startDate), new Date(b.startDate), isAsc);
        case 'endDate':
          return this.compare(new Date(a.endDate), new Date(b.endDate), isAsc);
        case 'reason':
          return this.compare(a.reason, b.reason, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'breakType':
          return this.compare(a.breakType, b.breakType, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean): number {
    if (a < b) {
      return isAsc ? -1 : 1;
    } else if (a > b) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'pending-status';
      case 'APPROVED':
        return 'approved-status';
      case 'DENIED':
        return 'denied-status';
      default:
        return'';
    }
  }

  transformToFrensh(text: string) {
    return text === "PAID" ? "Payé" : text === "UNPAID" ? "Non-payé" : text === "DISEASE" ? "Maladie" : text === "MATERNITY" ? "Matenité" : "";
  }

}
