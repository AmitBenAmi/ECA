import { Injectable, Inject } from '@angular/core';

import { Logger } from './logger';

import { ConfigService } from '../config/config.service'

const noop = (): any => undefined;

@Injectable({
    providedIn: 'root'
})
export class LoggerService implements Logger{

    constructor(@Inject(ConfigService) private config: any) { 
        if (this.config.isDebugMode) {
            console.log('Console Logger Service registered');
        }
    }

    get info() {
        if (this.config.isDebugMode) {
            return console.info.bind(console);
        } 
        else {
            return noop;
        }
    }

    get warn() {
        if (this.config.isDebugMode) {
            return console.warn.bind(console);
        } 
        else {
            return noop;
        }
    }
    get error() {
        if (this.config.isDebugMode) {
            return console.error.bind(console);
        } 
        else {
            return noop;
        }
    }
}
