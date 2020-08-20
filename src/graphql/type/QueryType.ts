import { GraphQLObjectType } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeField } from '../interface/NodeInterface';

import * as UserLoader from '../modules/user/UserLoader';
import UserType, { UserConnection } from '../modules/user/UserType';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (_, __, context) => {
        return context && context.user;
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: connectionArgs,
      resolve: UserLoader.loadUsers,
    },
  }),
});
