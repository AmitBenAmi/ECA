import { Injectable } from '@angular/core';

import { OIDCConfig } from './oidc.config';
import { AuthType } from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public isDebugMode = true;
    public static authType: AuthType = AuthType.OIDC;
    public oidc = new OIDCConfig();

    constructor() { }

}