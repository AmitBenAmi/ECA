import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreComponent } from './core.component';
import { AppRoutingModule } from '../app-routing.module';

import { AuthModule, OidcSecurityService, OpenIdConfiguration, OidcConfigService } from 'angular-auth-oidc-client';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { HttpService } from './services/http/http.service';
import { AuthService } from './services/auth/auth.service';

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
    AppRoutingModule,
    AuthModule.forRoot()
  ],
  declarations: [CoreComponent, NavComponent],
  exports: [
    NavComponent
  ],
  providers: [
    HttpService,
    AuthService,
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: AuthService.loadOidcConfig,
      deps: [OidcConfigService],
      multi: true
    }
  ]
})
export class CoreModule { }
