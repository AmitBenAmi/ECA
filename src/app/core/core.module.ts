import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AuthModule, OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';

import { CoreComponent } from './core.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpService } from './services/http/http.service';
import { authFactory } from './services/auth/auth.factory';
import { AuthService } from './services/auth/auth.service';
import { OIDCAuthService } from './services/auth/oidc/oidc.auth.service';
import { ConfigService } from './services/config/config.service';
import { LoggerService } from './services/logger/logger.service';

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
  declarations: [
    CoreComponent, 
    NavComponent,
    LoginComponent
  ],
  exports: [
    NavComponent
  ],
  providers: [
    HttpService,
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: OIDCAuthService.loadOidcConfig,
      deps: [OidcConfigService],
      multi: true
    },
    {
      provide: AuthService,
      useFactory: authFactory(ConfigService.authType),
      deps: [
        LoggerService,
        ConfigService,
        Router,
        OidcSecurityService,
        OidcConfigService
      ]
    }
  ]
})
export class CoreModule { }
