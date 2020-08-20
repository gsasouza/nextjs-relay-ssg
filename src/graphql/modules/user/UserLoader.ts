import DataLoader from 'dataloader';
import mock from './mock';
import { GraphQLContext } from '../../common/types';
import { DataLoaderKey } from '../../loaders/dataloaders';
import { User } from './UserModel';
import { ConnectionArguments, connectionFromArray } from 'graphql-relay';

export type { User } from './UserModel';

export default class UserLoader implements User {
  id: string;
  email: string;
  picture: string;
  name: string;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.picture = data.picture;
    this.name = data.name;
  }
}

export const getLoader = () =>
  new DataLoader(async (ids) => mock.filter(({ id }) => ids.includes(id)));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: DataLoaderKey) => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.UserLoader.load(id);
    return viewerCanSee() ? new UserLoader(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = (
  { dataloaders }: GraphQLContext,
  id: DataLoaderKey
) => {
  return dataloaders.UserLoader.clear(id.toString());
};

type LoadUsersArgs = ConnectionArguments;

export const loadUsers = async (_: object, args: LoadUsersArgs) => {
  return connectionFromArray(mock, args);
};
