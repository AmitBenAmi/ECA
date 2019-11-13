import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration, AuthorizationResult, AuthorizationState, OidcConfigService, ConfigResult } from 'angular-auth-oidc-client';
import { Observable ,  Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService implements OnDestroy {
    private _isAuthorized: boolean = false;

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private oidcConfigService: OidcConfigService,
        private loggerService: LoggerService,
        private configService: ConfigService,
        private router: Router
    ) {
        this.initAuth();
    }

    private isAuthorizedSubscription: Subscription = new Subscription;

    ngOnDestroy(): void {
        if (this.isAuthorizedSubscription) {
            this.isAuthorizedSubscription.unsubscribe();
        }
    }

    public async initAuth() {
        this.oidcConfigService.onConfigurationLoaded.subscribe((oidcConfigResult: ConfigResult) => {
            const openIdConfiguration: OpenIdConfiguration = {
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
    
            this.oidcSecurityService.setupModule(openIdConfiguration, oidcConfigResult.authWellknownEndpoints);
    
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

    public get isAuthorized(): boolean {
        return this._isAuthorized;
    }

    private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
        this.loggerService.info(`Auth result received AuthorizationState: ${authorizationResult.authorizationState}, 
            ValidationResult: ${authorizationResult.validationResult}`);

        if (authorizationResult.authorizationState === AuthorizationState.unauthorized) {
            this.router.navigate([`/${this.configService.oidc.routing.loggedOutRoute}`]);
            // if (window.parent) {
            //     // sent from the child iframe, for example the silent renew
            //     this.router.navigate([`/${this.configService.oidc.routing.loggedOutRoute}`]);
            // } else {
            //     window.location.href = `/${this.configService.oidc.routing.loggedOutRoute}`;
            // }
        }
    }

    private onOidcModuleSetup() {
        this.oidcSecurityService.authorizedImplicitFlowCallback();
    }

    getIsAuthorized(): Observable<boolean> {
        return this.oidcSecurityService.getIsAuthorized();
    }

    login() {
        this.loggerService.info('Start Login');
        this.oidcSecurityService.authorize();
    }

    logout() {
        this.loggerService.info('start logoff');
        this.oidcSecurityService.logoff();
    }

    // private getHeaders() {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Content-Type', 'application/json');
    //     return this.appendAuthHeader(headers);
    // }

    public getToken() {
        const token = this.oidcSecurityService.getToken();
        return token;
    }

    static loadOidcConfig(oidcConfigService: OidcConfigService) {
        return () => {
            oidcConfigService.load_using_stsServer(new ConfigService().oidc.authUrl);
        }
    }

    // private appendAuthHeader(headers: HttpHeaders) {
    //     const token = this.oidcSecurityService.getToken();

    //     if (token === '') { return headers; }

    //     const tokenValue = 'Bearer ' + token;
    //     return headers.set('Authorization', tokenValue);
    // }
}