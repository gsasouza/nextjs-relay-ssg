import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import { NodeInterface } from '../../interface/NodeInterface';
import { User } from './UserModel';
import { GraphQLContext } from '../../common/types';

const UserType: GraphQLObjectType<User, GraphQLContext> = new GraphQLObjectType(
  {
    name: 'User',
    description: 'User data',
    fields: () => ({
      id: globalIdField('User'),
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
    }),
    interfaces: () => [NodeInterface],
  }
);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

export default UserType;
