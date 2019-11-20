import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { DataService } from '../../../core/services/data/data.service';

import { EventsRoutingModule } from './events-routing.module';
import { EventsService } from '../services/events.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    EventsRoutingModule
  ],
  declarations: [],
  providers: [
    {
      provide: DataService,
      useClass: EventsService
    }
  ]
})
export class EventsModule { }
