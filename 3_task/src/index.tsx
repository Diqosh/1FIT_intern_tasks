import React from 'react';
import ReactDOM from 'react-dom/client';
import {useMutation, QueryClientProvider, QueryClient} from "react-query";
import App from "./components/app/app";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>

);

