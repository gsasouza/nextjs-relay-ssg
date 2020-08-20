import React from 'react';
import { AppProps } from 'next/app';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from '../relay/environment';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RelayEnvironmentProvider environment={environment()}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
};

export default MyApp;
