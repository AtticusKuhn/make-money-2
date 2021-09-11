import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { getS } from '../redux/earn';
import { makeStore } from '../redux/store';
import App from './App';
import './App.scss';

getS().then(s => {
    const defaultState = {
        value: 12,
        equippedUpgrades: [{ name: "original button" }],
        purchasedUpgrades: [{ name: "original button" }],
    };
    const combined = Object.assign(defaultState, s)
    const st = makeStore({ money: combined });
    ReactDOM.render(
        <HashRouter>
            <Provider store={st}>
                <App />
            </Provider>
        </HashRouter>,
        document.querySelector('#root'),
    );
})
