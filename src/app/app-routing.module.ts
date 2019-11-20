import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { ConfigService } from './core/services/config/config.service';
import { AuthGuard } from './core/services/auth/auth.guard';

import { EventsRouteConfigService } from './features/events/services/events.route.config.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [] },
  { path: ConfigService.route.login, component: LoginComponent },
  { 
    path: EventsRouteConfigService.events, 
    loadChildren: () => import('./features/events/modules/events.module').then(m => m.EventsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
