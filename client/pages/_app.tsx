import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/apollo-client';

import '../styles/globals.css';
import { StateContext, DispatchContext } from '../utils/context';
import { useReducer } from 'react';
import reducer from '../utils/reducer';
import { SignUpData, State } from '../utils/types';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const initialState: State = { signUpData: null };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
