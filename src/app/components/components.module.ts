import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
    ]
})
export class ComponentsModule { }
