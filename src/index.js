import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';
import ToggleThemeMode from './utils/ToggleThemeMode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleThemeMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleThemeMode>
    </Provider>
  </React.StrictMode>
);

{
  /*
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);*/
}
