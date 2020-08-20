import React from 'react';
import { graphql } from 'react-relay';
import {
  pagesQuery,
  pagesQueryResponse,
} from '../__generated__/pagesQuery.graphql';
import withQuery, { getRelayStaticProps } from '../relay/withQuery';

const query = graphql`
  query pagesQuery {
    users {
      edges {
        node {
          email
          id
        }
      }
    }
  }
`;

type Props = {
  query: pagesQueryResponse;
};

const Home: React.FC<Props> = ({ query }) => {
  return (
    <>
      <h1>Nodes:</h1>
      <br />
      {query.users?.edges?.map((edge) => (
        <p key={edge?.node?.id}>{edge?.node?.email}</p>
      ))}
    </>
  );
};

export const getStaticProps = getRelayStaticProps(query);

export default withQuery<Props, pagesQuery>(Home, query);
