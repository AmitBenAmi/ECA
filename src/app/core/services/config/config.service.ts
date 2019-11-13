import { Injectable } from '@angular/core';
import { OIDCConfig } from './oidc.config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public isDebugMode = true;
    public oidc = new OIDCConfig();

    constructor() { }

}