import { forEach } from 'lodash';
import { get } from '@lykmapipo/express-common';
import { jsonSchema } from '@lykmapipo/mongoose-common';
import { Predefine, info, apiVersion, start } from '../src';

const startHttpServer = () => {
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  get(`/${apiVersion}/schemas`, (request, response) => {
    const schema = jsonSchema();
    response.status(200);
    response.json(schema);
  });

  // fire http serve
  start((error, env) => {
    if (error) {
      throw error;
    }
    // start http server
    forEach(Predefine.BUCKETS, bucket => {
      const path = `predefines/${bucket}`;
      console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/${path}`);
    });
  });
};

// connect and start http server
startHttpServer();
