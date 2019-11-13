import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration, AuthorizationResult, AuthorizationState, OidcConfigService, ConfigResult } from 'angular-auth-oidc-client';
import { Observable ,  Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnDestroy {
    private static authUrl = 'https://accounts.google.com';

    private originUrl = 'http://localhost:4200';
    private _isAuthorized = false;

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private oidcConfigService: OidcConfigService,
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
                stsServer: AuthService.authUrl,
                redirect_url: this.originUrl + '/blabla',
                client_id: '189985125254-mrqdsut64mhhimftt3q3skfvut69q8eb.apps.googleusercontent.com',
                response_type: 'id_token token',
                scope: 'openid profile',
                post_logout_redirect_uri: this.originUrl + '/amit',
                forbidden_route: '/forbidden',
                unauthorized_route: '/unauthorized',
                silent_renew: true,
                silent_renew_url: this.originUrl + '/silent-renew.html',
                history_cleanup_off: true,
                auto_userinfo: true,
                log_console_warning_active: true,
                log_console_debug_active: true,
                max_id_token_iat_offset_allowed_in_seconds: 10,
            };
    
            this.oidcSecurityService.setupModule(openIdConfiguration, oidcConfigResult.authWellknownEndpoints);
    
            if (this.oidcSecurityService.moduleSetup) {
                this.doCallbackLogicIfRequired();
            } else {
                this.oidcSecurityService.onModuleSetup.subscribe(() => {
                    this.doCallbackLogicIfRequired();
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

    private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {

        console.log('Auth result received AuthorizationState:'
            + authorizationResult.authorizationState
            + ' validationResult:' + authorizationResult.validationResult);

        if (authorizationResult.authorizationState === AuthorizationState.unauthorized) {
            if (window.parent) {
                // sent from the child iframe, for example the silent renew
                this.router.navigate(['/unauthorized']);
            } else {
                window.location.href = '/unauthorized';
            }
        }
    }

    private doCallbackLogicIfRequired() {

        this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
    }

    getIsAuthorized(): Observable<boolean> {
        return this.oidcSecurityService.getIsAuthorized();
    }

    login() {
        console.log('start login');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    // private getHeaders() {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Content-Type', 'application/json');
    //     return this.appendAuthHeader(headers);
    // }

    get isAuthorized() {
        return this._isAuthorized;
    }

    public getToken() {
        const token = this.oidcSecurityService.getToken();
        return token;
    }

    static loadOidcConfig(oidcConfigService: OidcConfigService) {
        return () => {
            oidcConfigService.load_using_stsServer(AuthService.authUrl);
        }
    }

    // private appendAuthHeader(headers: HttpHeaders) {
    //     const token = this.oidcSecurityService.getToken();

    //     if (token === '') { return headers; }

    //     const tokenValue = 'Bearer ' + token;
    //     return headers.set('Authorization', tokenValue);
    // }
}