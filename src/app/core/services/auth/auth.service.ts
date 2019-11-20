import { Injectable } from '@angular/core';

import { Auth } from './auth';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export abstract class AuthService implements Auth {
    protected _isAuthorized: boolean = false;
    protected _token: string;

    constructor(
        protected loggerService: LoggerService,
        protected configService: ConfigService
    ) {}

    public get isAuthorized(): boolean {
        return this._isAuthorized;
    }

    public get token(): string {
        return this._token;
    }

    abstract login(): void;

    abstract logout(): void;

    // private appendAuthHeader(headers: HttpHeaders) {
    //     const token = this.oidcSecurityService.getToken();

    //     if (token === '') { return headers; }

    //     const tokenValue = 'Bearer ' + token;
    //     return headers.set('Authorization', tokenValue);
    // }
}