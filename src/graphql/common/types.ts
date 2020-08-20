import { GraphQLDataloaders } from '../loaders/dataloaders';
import { User } from '../modules/user/UserModel';

export interface GraphQLContext {
  dataloaders: GraphQLDataloaders;
  user?: User;
}
