// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverUrl: 'http://sd-1060583-h00012.ferozo.net:3089/api',
  imagesUrl: 'http://sd-1060583-h00012.ferozo.net:3089/files'

  // serverUrl: 'http://172.20.16.109:3071/api',
  // filesUrl: 'http://172.20.16.109:3071/files'
  // serverUrl: 'http://localhost:3089/api',
  // filesUrl: 'http://localhost:3089/files'
  // serverUrl: '/api',
  // imagesUrl: '/files'
};
