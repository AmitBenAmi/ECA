import { Injectable } from '@angular/core';
import { DataModule } from '../modules/data/data.module';

@Injectable({
    providedIn: DataModule
})
export class DataRouteConfig {
    public static events: string = 'events';

    constructor() {}
}