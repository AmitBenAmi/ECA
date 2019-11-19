import { HttpService } from 'src/app/core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

import { DataRouteConfig } from '../../config/data.route.config';
import { EventsService } from '../events/events.service';

export function dataServiceFactory() {
    return (httpService: HttpService, loggerService: LoggerService) => {
        switch(window.location.pathname) {
            case (`/${DataRouteConfig.events}`):
            default: {
                return new EventsService(httpService, loggerService);
            }
        }
    }
}