import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/auth/auth.guard';
import { DataViewComponent } from './data/components/data-view/data-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'events', component: DataViewComponent },
  { path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
