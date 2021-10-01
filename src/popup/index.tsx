import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { getS, InitalState, setS } from '../redux/earn';
import { makeStore } from '../redux/store';
import { upgradeType } from '../types';
import App from './App';
import './App.scss';


getS().then(s => {
    const ob = { name: "original button", type: upgradeType.button, cost: 1 }
    const defaultState: InitalState = {
        value: 1,
        income: 1,
        equippedUpgrades: [ob],
        purchasedUpgrades: [ob],
        purchasedItems: [],
        equippedButton: ob,
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
