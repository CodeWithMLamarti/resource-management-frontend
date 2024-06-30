import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {AuthGuard} from "../../guards/auth.guard";
import {AccessDeniedComponent} from "../../access-denied/access-denied.component";
import {SignUpComponent} from "../../sign-up/sign-up.component";
import {UsersListComponent} from "../../users-list/users-list.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard],data: {role: ["MANAGER", "HR", "EMPLOYEE"]},    },
    { path: 'sign-up',   component: SignUpComponent, canActivate: [AuthGuard],data: {role: ["HR"]},    },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard],data: {role: ["MANAGER", "HR"]} },

    { path: 'users-list',     component: UsersListComponent,  canActivate: [AuthGuard],data: {role: ["HR"]}  },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuard],data: {role: ["MANAGER", "HR", "EMPLOYEE"]} },
    //{ path: 'icons',          component: IconsComponent },
    //{ path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent, canActivate: [AuthGuard],data: {role: ["MANAGER", "HR"]} },
    {
        path: 'access-denied',
        component: AccessDeniedComponent
    }
    //{ path: 'upgrade',        component: UpgradeComponent },
];
