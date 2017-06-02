import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app.component';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <AppComponent />
  </Provider>
), document.getElementById('app-root'));
