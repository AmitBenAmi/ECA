import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreComponent } from './core.component';
import { AppRoutingModule } from '../app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { HttpService } from './services/http/http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule
  ],
  declarations: [CoreComponent, NavComponent],
  exports: [
    NavComponent
  ],
  providers: [
    HttpService
  ]
})
export class CoreModule { }
