import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { getS, InitalState, setS } from '../redux/earn';
import { makeStore } from '../redux/store';
import App from './App';
import './App.scss';

getS().then(s => {
    const defaultState: InitalState = {
        value: 12,
        equippedUpgrades: [{ name: "original button", isButton: true }],
        purchasedUpgrades: [{ name: "original button", isButton: true }],
        equippedButton: { name: "original button", isButton: true },
        lastSaved: new Date().getTime()
    };
    const combined = Object.assign(defaultState, s)
    const st = makeStore({ money: combined });
    setS(combined)
    ReactDOM.render(
        <HashRouter>
            <Provider store={st}>
                <App />
            </Provider>
        </HashRouter>,
        document.querySelector('#root'),
    );
})
