import { Injectable } from '@angular/core';

import { OIDCConfig } from './oidc.config';
import { AuthType } from '../auth/auth';
import { CoreRouteConfig } from './core.route.config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public isDebugMode = true;
    public apiUrl = "http://localhost:58723/api";
    public static authType: AuthType = AuthType.OIDC;
    public oidc = new OIDCConfig();
    public static route = new CoreRouteConfig();

    constructor() { }

}