import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from './App';
import { API_BASE } from './constants';

import './styles/globals.css';
import './styles/colors.css';

const client = new ApolloClient({
  uri: `${API_BASE}/data`,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
