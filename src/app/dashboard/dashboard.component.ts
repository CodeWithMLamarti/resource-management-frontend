import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {UserDto} from "../response/UserDto";
import {UserService} from "../service/user.service";
import {Chart, registerables} from "chart.js";
import {BreakService} from "../service/break.service";
import {Break} from "../request/Break";
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    chart: any;
    users: UserDto[];
    breaks: Break[]
    employees: UserDto[]
    hrs: UserDto[]
    managers: UserDto[]
    total: number;
    employeeCount: number;
    hrCount: number;
    managerCount: number;
    paidCount: number;
    unpaidCount: number;
    diseaseCount: number;
    maternityCount: number;
  constructor(private userService: UserService, private breakService: BreakService) { }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe(res => {
            this.users = res;
            this.employees = [...res];
            this.hrs = [...res];
            this.managers = [...res];
            this.total = this.users.length;
            this.employeeCount = this.employees.filter(user => user.role === "EMPLOYEE").length;
            this.hrCount = this.hrs.filter(user => user.role === "HR").length;
            this.managerCount = this.managers.filter(user => user.role === "MANAGER").length;
            this.setUserChart()
        });
        this.breakService.getAllBreakRequests().subscribe(res => {
            this.breaks = res;
            this.paidCount = res.filter(abreak => abreak.breakType === "PAID").length;
            this.unpaidCount = res.filter(abreak => abreak.breakType === "UNPAID").length;
            this.diseaseCount = res.filter(abreak => abreak.breakType === "DISEASE").length;
            this.maternityCount = res.filter(abreak => abreak.breakType === "MATERNITY").length;
            this.setBreaksChart();
        })





    }

    private setUserChart() {
        const ctx = (<HTMLCanvasElement>document.getElementById("usersChart")).getContext('2d');
        console.log(this.employeeCount, this.hrCount, this.managerCount)
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Employé", "Resource Humaine", "Manager"],
                datasets: [{
                    label: "Nombre d'utilisateur",
                    data: [this.employeeCount, this.hrCount, this.managerCount],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            }
        })
  }
    private setBreaksChart() {
        const ctx = (<HTMLCanvasElement>document.getElementById("breaksTypeChart")).getContext('2d');
        console.log(this.paidCount, this.unpaidCount, this.diseaseCount, this.maternityCount)
        this.chart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ["Payé", "Non-payé", "Maladie", "Maternité"],
                datasets: [{
                    label: "Nombre de Congé",
                    data: [this.paidCount, this.unpaidCount, this.diseaseCount, this.maternityCount],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            }
        })
    }


}
