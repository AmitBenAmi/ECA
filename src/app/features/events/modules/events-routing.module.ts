import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsTableComponent } from '../events-table/events-table.component'

const routes: Routes = [
    { path: '', component: EventsTableComponent, data: { lazyLoad: true } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }