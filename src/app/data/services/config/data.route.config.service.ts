import { Injectable } from '@angular/core';

@Injectable()
export class DataRouteConfigService {
    public static events: string = 'events';
    public api: ApiDataRouteConfig = new ApiDataRouteConfig();

    constructor() {}
}

export class ApiDataRouteConfig {
    public events: string = 'EventController';
}