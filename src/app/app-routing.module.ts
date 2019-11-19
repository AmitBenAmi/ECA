import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { ConfigService } from './core/services/config/config.service';
import { AuthGuard } from './core/services/auth/auth.guard';

import { DataViewComponent } from './data/components/data-view/data-view.component';
import { DataRouteConfigService } from './data/services/config/data.route.config.service';

const routes: Routes = [
  { path: ConfigService.route.login, component: LoginComponent },
  { path: DataRouteConfigService.events, component: DataViewComponent },
  { path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
