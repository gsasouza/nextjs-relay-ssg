import React from 'react';
import { OperationType } from 'relay-runtime';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { NextPage } from 'next';
import environment from './environment';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { GraphQLTaggedNode } from 'relay-runtime';
import { fetchQuery } from 'react-relay';
import { CacheConfig } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { useQuery } from 'relay-hooks/lib';

type Props<P> = { records: RecordMap } & P;

type BaseComponentProps = {
  query: OperationType['response'];
};

function withQuery<P extends BaseComponentProps, Q extends OperationType>(
  Component: React.ComponentType<P>,
  query: GraphQLTaggedNode,
  variables?: Q['variables']
): React.FC<Props<P>> {
  const WithRelayEnvironment: React.FC<P> = () => {
    const { props: queryResponse, error } = useQuery<Q>(query, variables, {
      fetchPolicy: 'store-only',
    });
    if (error) return <h1>An Error Occurred</h1>;
    if (!queryResponse) return <h1>Loading</h1>;
    // @ts-ignore
    return <Component query={queryResponse} />;
  };

  const WithQuery: NextPage<Props<P>> = ({ records, ...props }) => {
    return (
      <RelayEnvironmentProvider environment={environment(records)}>
        <WithRelayEnvironment {...(props as P)} />
      </RelayEnvironmentProvider>
    );
  };
  return WithQuery;
}

export function getRelayStaticProps<T extends OperationType>(
  query: GraphQLTaggedNode,
  variables: T['variables'] = {},
  cacheConfig?: CacheConfig | null
) {
  return async () => {
    const env = environment();
    await fetchQuery(env, query, variables, cacheConfig);

    return {
      props: {
        records: env.getStore().getSource().toJSON(),
      },
    };
  };
}
export default withQuery;
