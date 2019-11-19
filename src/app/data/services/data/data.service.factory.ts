import { ConfigService } from 'src/app/core/services/config/config.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

import { DataRouteConfigService } from '../config/data.route.config.service';
import { EventsService } from '../events/events.service';

export function dataServiceFactory() {
    return (
        httpService: HttpService, 
        loggerService: LoggerService,
        configService: ConfigService,
        dataRouteConfigService: DataRouteConfigService) => {
        switch(window.location.pathname) {
            case (`/${DataRouteConfigService.events}`):
            default: {
                return new EventsService(httpService, loggerService, configService, dataRouteConfigService);
            }
        }
    }
}