import React, {Fragment} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';

import { 
  ApolloClient
  , InMemoryCache
  , ApolloProvider
  , NormalizedCacheObject 
} from "@apollo/client";


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/api',
  resolvers: {}
});


interface AppProps {
  args: [string];
}

const App: React.FC<AppProps> = (_props: AppProps) => {
  // const name = props.name;
  return (
    <ApolloProvider client={client}>
      <Fragment>
      <Router>
        <Route path="/" exact component={Auth} />
        <Route path="/home" exact component={Home} />
      </Router>
      </Fragment>
    </ApolloProvider>
  );
};

export default App;