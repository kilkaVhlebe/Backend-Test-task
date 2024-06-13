import * as process from 'process';

export const apiConfig= {

  domain: "artempoznakov990",

  auth: {
    client_id: process.env.AMOCRM_ID,
    client_secret: process.env.AMOCRM_SECRET,
    redirect_uri: process.env.AMOCRM_REDIRECT_URI,
    code: process.env.AMOCRM_CODE,
  },
}
