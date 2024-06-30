import {Component, OnDestroy, OnInit} from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    data: object
}
// typography ==> Documents
//User Profile ==> Employé
//Table List ==> Demande du Congé

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' ,data: {role: ["MANAGER", "HR"]} },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '',data: {role: ["MANAGER", "HR", "EMPLOYEE"]} },
    { path: '/sign-up', title: 'Sign-up',  icon:'person', class: '',data: {role: ["HR"]} },
    { path: '/users-list', title: 'Liste des Employés',  icon:'content_paste', class: '',data: {role: ["HR"]} },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '',data: {role: ["MANAGER", "HR", "EMPLOYEE"]} },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '',data: {role: ["MANAGER", "HR"]} },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: any[];
  role: string;

  constructor() { }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit() {
      this.role = localStorage.getItem("role");
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.menuItems);
    console.log("from side bar", this.role);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
