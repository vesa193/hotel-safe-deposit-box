import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './store/rootReducer';
import rootSaga from './store/rootSaga';
import App from './App';
import { getConfig } from './appConfig';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();

let middleware = applyMiddleware(sagaMiddleware);
if (getConfig().general.isReduxDevToolsOn) {
  middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
}

export const store = createStore(reducers, middleware);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
