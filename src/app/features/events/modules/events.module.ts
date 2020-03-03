import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { DataService } from '../../../core/services/data/data.service';

import { EventsRoutingModule } from './events-routing.module';
import { EventsRouteConfigService, ApiEventsRouteConfig } from '../services/events.route.config.service';
import { EventsService } from '../services/events.service';
import { EventsTableComponent } from '../events-table/events-table.component'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    EventsRoutingModule
  ],
  declarations: [EventsTableComponent],
  providers: [
    ApiEventsRouteConfig,
    EventsRouteConfigService,
    {
      provide: DataService,
      useClass: EventsService
    }
  ]
})
export class EventsModule { }
