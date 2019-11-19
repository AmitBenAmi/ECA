import { ActivatedRoute } from '@angular/router';

import { HttpService } from 'src/app/core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

import { EventsService } from '../events/events.service';

export function dataServiceFactory() {
    return (activatedRoute: ActivatedRoute, httpService: HttpService, loggerService: LoggerService) => {
        switch(activatedRoute.snapshot.url[0].path) {
            case ('events'):
            default: {
                return new EventsService(httpService, loggerService);
            }
        }
    }
}