import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../../core/core.module'

import { ConfigService } from 'src/app/core/services/config/config.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

import { DataRouteConfigService } from '../../services/config/data.route.config.service';
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
    DataRouteConfigService,
    {
      provide: DataService,
      useFactory: dataServiceFactory(),
      deps: [
        HttpService,
        LoggerService,
        ConfigService,
        DataRouteConfigService
      ]
    }
  ]
})
export class DataModule { }
