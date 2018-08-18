// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  /*
  authenticationUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/token/generate-token',
  logoutUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/logout',
  signUpUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/signup',

  currencyListUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/api/listAll',
  quotationUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/api/quote',
  historicUrl: 'https://currency-converter-rss.herokuapp.com/currency-converter/api/historic',
  */
  authenticationUrl: 'http://localhost:8080/currency-converter/token/generate-token',
  logoutUrl: 'http://localhost:8080/currency-converter/logout',
  signUpUrl: 'http://localhost:8080/currency-converter/signup',

  currencyListUrl: 'http://localhost:8080/currency-converter/api/listAll',
  quotationUrl: 'http://localhost:8080/currency-converter/api/quote',
  historicUrl: 'http://localhost:8080/currency-converter/api/historic'
};
