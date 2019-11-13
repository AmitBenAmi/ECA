export interface Auth {
    login(): void;
    logout(): void;

}

export enum AuthType {
    OIDC
}