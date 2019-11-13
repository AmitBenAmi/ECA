import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { OidcSecurityService, OpenIdConfiguration, AuthorizationResult, AuthorizationState, OidcConfigService, ConfigResult } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';

import { ConfigService } from '../../config/config.service';
import { AuthService } from '../auth.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class OIDCAuthService extends AuthService implements OnDestroy {
    private isAuthorizedSubscription: Subscription = new Subscription;

    constructor(
        loggerService: LoggerService,
        configService: ConfigService,
        router: Router,
        private oidcSecurityService: OidcSecurityService,
        private oidcConfigService: OidcConfigService
    ) {
        super(loggerService, configService, router)
        
        this.initAuth();
    }

    ngOnDestroy(): void {
        if (this.isAuthorizedSubscription) {
            this.isAuthorizedSubscription.unsubscribe();
        }
    }

    public async initAuth() {
        this.oidcConfigService.onConfigurationLoaded.subscribe((oidcConfigResult: ConfigResult) => {
            this.oidcSecurityService.setupModule(this.openIdConfiguration, oidcConfigResult.authWellknownEndpoints);
    
            if (this.oidcSecurityService.moduleSetup) {
                this.onOidcModuleSetup();
            } else {
                this.oidcSecurityService.onModuleSetup.subscribe(() => {
                    this.onOidcModuleSetup();
                });
            }

            this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe((isAuthorized => {
                this._isAuthorized = isAuthorized;
            }));
    
            this.oidcSecurityService.onAuthorizationResult.subscribe(
                (authorizationResult: AuthorizationResult) => {
                    this.onAuthorizationResultComplete(authorizationResult);
                });
        });
    }

    private get openIdConfiguration(): OpenIdConfiguration {
        return {
            stsServer: this.configService.oidc.authUrl,
            redirect_url: `${window.location.origin}/${this.configService.oidc.routing.loggedOutRoute}`,
            client_id: this.configService.oidc.oidcClientId,
            response_type: this.configService.oidc.responseType,
            scope: this.configService.oidc.scope,
            post_logout_redirect_uri: this.configService.oidc.routing.loggedOutRoute,
            forbidden_route: this.configService.oidc.routing.forbidden,
            unauthorized_route: this.configService.oidc.routing.unauthorized,
            silent_renew: true,
            silent_renew_url: `${window.location.origin}/${this.configService.oidc.routing.silentRenew}`,
            history_cleanup_off: true,
            auto_userinfo: true,
            log_console_warning_active: this.configService.isDebugMode,
            log_console_debug_active: this.configService.isDebugMode
        };
    }

    private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
        this.loggerService.info(`Auth result received AuthorizationState: ${authorizationResult.authorizationState}, 
            ValidationResult: ${authorizationResult.validationResult}`);

        switch (authorizationResult.authorizationState) {
            case (AuthorizationState.authorized): {
                this._token = this.oidcSecurityService.getToken();

                break;
            }
            default: {
                this.router.navigate([`/${this.configService.oidc.routing.loggedOutRoute}`]);

                break;
            }
        }
    }

    private onOidcModuleSetup() {
        this.oidcSecurityService.authorizedImplicitFlowCallback();
    }

    public login(): void {
        this.loggerService.info('Start Login');
        this.oidcSecurityService.authorize();
    }

    public logout(): void {
        this.loggerService.info('start logoff');
        this.oidcSecurityService.logoff();
    }
    
    static loadOidcConfig(oidcConfigService: OidcConfigService) {
        return () => {
            oidcConfigService.load_using_stsServer(new ConfigService().oidc.authUrl);
        }
    }
}