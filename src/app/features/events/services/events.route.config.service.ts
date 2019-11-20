import { Injectable } from '@angular/core';

@Injectable()
export class EventsRouteConfigService {
    public static events: string = 'events';

    constructor(public api: ApiEventsRouteConfig) {}
}

@Injectable()
export class ApiEventsRouteConfig {
    public events: string = 'EventController';
}