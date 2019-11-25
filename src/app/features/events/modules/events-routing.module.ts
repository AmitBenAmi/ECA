import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataViewComponent } from '../../../core/components/data-view/data-view.component';

const routes: Routes = [
    { path: '', component: DataViewComponent, data: { lazyLoad: true } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }