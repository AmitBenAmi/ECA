import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoreModule } from '../../../core/core.module'

import { HttpService } from 'src/app/core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

import { DataRouteConfig } from '../../config/data.route.config';
import { DataViewComponent } from '../../components/data-view/data-view.component';
import { DataService } from '../../services/data/data.service';
import { dataServiceFactory } from '../../services/data/data.service.factory';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    DataViewComponent
  ],
  exports: [
    DataViewComponent
  ],
  providers: [
    DataRouteConfig,
    {
      provide: DataService,
      useFactory: dataServiceFactory(),
      deps: [
        ActivatedRoute,
        HttpService,
        LoggerService
      ]
    }
  ]
})
export class DataModule { }
