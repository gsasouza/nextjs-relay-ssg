import { IMiddleware } from 'graphql-middleware';
import { UserLoader } from './dataloaders';

export const getLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
});

export const dataloadersMiddleware: IMiddleware = async (
  resolve,
  root,
  args,
  ctx,
  info
) => {
  const dataloaders = getLoaders();
  return resolve(root, args, { ...ctx, dataloaders }, info);
};
