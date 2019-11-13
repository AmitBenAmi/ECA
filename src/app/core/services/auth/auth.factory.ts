import { Router } from '@angular/router';

import { OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';

import { AuthType } from './auth';
import { OIDCAuthService } from './oidc/oidc.auth.service';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

export function authFactory(authType: AuthType) {
    return (loggerService: LoggerService,
        configService: ConfigService,
        router: Router,
        oidcSecurityService: OidcSecurityService,
        oidcConfigService: OidcConfigService) => {
        switch (authType) {
            case (AuthType.OIDC):
            default: {
                return new OIDCAuthService(loggerService, configService, router, oidcSecurityService, oidcConfigService);
            }
        }
    }
}