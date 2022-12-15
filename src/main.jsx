import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import PrepareLocale from './prepareLocale';
import { store } from './store/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));


// console.log("MAIN")
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PrepareLocale />
        </Provider>
    </React.StrictMode>
);
