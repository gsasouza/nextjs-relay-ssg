import { ApolloServer } from 'apollo-server-micro';
import { applyMiddleware } from 'graphql-middleware';
import schema from '../../graphql/schema';
import { dataloadersMiddleware } from '../../graphql/loaders/middleware';

const server = new ApolloServer({
  schema: applyMiddleware(schema, dataloadersMiddleware),
  playground: {
    endpoint: '/api/graphql',
  },
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
