export class OIDCConfig {
    public authUrl = 'https://accounts.google.com';
    public oidcClientId = '189985125254-mrqdsut64mhhimftt3q3skfvut69q8eb.apps.googleusercontent.com';
    public responseType = 'id_token token';
    public scope = 'openid profile';
    public routing = new OIDCRouteConfig();;
}

class OIDCRouteConfig {
    public loggedOutRoute = 'login';
    public unauthorized = 'unauthorized';
    public forbidden = 'forbidden';
    public silentRenew = 'silent-renew.html';
}