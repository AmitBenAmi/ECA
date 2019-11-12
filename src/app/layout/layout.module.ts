import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
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
    NavigationComponent,
    ToolbarComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
