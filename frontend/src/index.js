import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import storage from "redux-persist/lib/storage";

import rootReducer from './redux/redusers'
import { client } from './graphql/apollo'
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';


const persistConfig = {
    key: "root",
    storage,
};
const reducers = persistReducer(persistConfig, rootReducer)

const store = createStore(reducers, undefined, compose(applyMiddleware(thunk)))
const persistor = persistStore(store)


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </PersistGate>
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
