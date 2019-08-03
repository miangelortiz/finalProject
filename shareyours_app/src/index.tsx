import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//REDUX - reducers and providers
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./reducers/reducers";

//redux-devtools-extension (installed in google chrome)
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(reducers, devToolsEnhancer({}));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  serviceWorker.unregister();
