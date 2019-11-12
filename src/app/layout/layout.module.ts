import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [
    LayoutComponent,
    NavigationComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
