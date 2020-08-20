import DataLoader from 'dataloader';

import * as UserLoader from '../modules/user/UserLoader';
export type DataLoaderKey = string | object;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.User>;
}

export { UserLoader };
