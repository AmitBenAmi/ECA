import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AuthModule, OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';

import { AppRoutingModule } from '../app-routing.module';
import { HttpService } from './services/http/http.service';
import { authFactory } from './services/auth/auth.factory';
import { AuthService } from './services/auth/auth.service';
import { OIDCAuthService } from './services/auth/oidc/oidc.auth.service';
import { ConfigService } from './services/config/config.service';
import { LoggerService } from './services/logger/logger.service';
import { TreeComponent } from './components/tree/tree.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatTreeModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: HttpLoaderFactory,
         deps: [HttpClient]
      }
   })
  ],
  declarations: [
    NavComponent,
    TableComponent,
    LoginComponent,
    TreeComponent
  ],
  exports: [
    NavComponent,
    TableComponent,
    TreeComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: getCurrentLocale()},
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getCurrentLocale(): string {
  return localStorage.getItem('Language') || 'he';
}