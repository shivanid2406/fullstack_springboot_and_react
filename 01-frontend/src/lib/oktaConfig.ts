export const oktaConfig = {
  clientId: '0oah1kaoqlTAF91w35d7',
  issuer: 'https://dev-54556598.okta.com/oauth2/default',
  redirectUri: 'https://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};
