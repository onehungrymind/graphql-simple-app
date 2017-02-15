import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import {Schema} from './schema';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

interface IMainOptions {
  enableGraphiql: boolean;
  port: number;
  verbose?: boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

export function main(options: IMainOptions) {
  let app = express();

  app.use(cors());

  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
    schema: Schema,
  }));

  if (true === options.enableGraphiql) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({endpointURL: GRAPHQL_ROUTE}));
  }

  return new Promise((resolve, reject) => {
    let server = app.listen(options.port, () => {
      /* istanbul ignore if: no need to test verbose print */
      if (options.verbose) {
        verbosePrint(options.port, options.enableGraphiql);
      }

      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  main({
    enableGraphiql: true,
    port: PORT,
    verbose: true,
  });
}
