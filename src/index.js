import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/app/AppContainer';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import awsConfig from './aws-config';

Amplify.configure(awsConfig);
const store = configureStore();

function renderPage() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

renderPage();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
