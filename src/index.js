import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/store/reducers/index'
import thunk from 'redux-thunk';

const store=createStore(reducers, applyMiddleware(thunk))
const provider=<Provider store={store}>
                    <App />
               </Provider>

ReactDOM.render(provider, document.getElementById('root'));