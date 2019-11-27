import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthModule, OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';

import { HttpService } from './services/http/http.service';
import { authFactory } from './services/auth/auth.factory';
import { AuthService } from './services/auth/auth.service';
import { MatPaginatorI18nService } from './services/paginator/mat-paginator-i18n.service';
import { OIDCAuthService } from './services/auth/oidc/oidc.auth.service';
import { ConfigService } from './services/config/config.service';
import { LoggerService } from './services/logger/logger.service';
import { DataViewComponent } from './components/data-view/data-view.component';
import { TreeComponent } from './components/tree/tree.component';
import { InputComponent } from './components/input/input.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LOCALE_ID } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateComponent } from './components/date/date.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SelectComponent } from './components/select/select.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatTreeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
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
    TreeComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadioButtonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DataViewComponent,
    SpinnerComponent
  ],
  exports: [
    NavComponent,
    TableComponent,
    TreeComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    RadioButtonComponent,
    SelectComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    DataViewComponent,
    SpinnerComponent
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadioButtonComponent,
    CheckboxComponent
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
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorI18nService
    }
  ]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

export function getCurrentLocale(): string {
  return localStorage.getItem('Language') || 'he';
}