import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from "./store/create-store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

