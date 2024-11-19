import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient() 
const root = document.getElementById('root')

ReactDOM.render(

      <App />,
  document.getElementById('root')

  
);