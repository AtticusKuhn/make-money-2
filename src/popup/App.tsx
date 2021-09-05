import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getS, set, setAll, storageUpgrade } from '../redux/earn';
import { chromeStorage } from '../types';
import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { Upgrade, upgrades } from './pages/store';

const tmp = (a: storageUpgrade[]) => a.map(u => upgrades.find(x => x.name === u.name) as Upgrade).map(e => ({ name: e.name })) || [{ name: "original button" }]
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getS().then(s => {
            console.log("money is ", s.value)
            dispatch(set(s.value || 1))
            dispatch(setAll({
                value: s.value || 1,
                equippedUpgrades: tmp(s.equippedUpgrades),
                purchasedUpgrades: tmp(s.purchasedUpgrades)
            }))

        })
    }, [])
    return <div className="app">    <li>
        <Link to="/">Home</Link>
    </li>
        <li>
            <Link to="/LoadOut">LoadOut</Link>
        </li>
        <li>
            <Link to="/store">store</Link>
        </li>
        <li>
            <Link to="/debug">debug</Link>
        </li>
        <Route exact path="/" component={Index} />
        <Route path="/LoadOut" component={LoadOut} />
        <Route path="/debug" component={Debug} />

        <Route path="/store" component={store} /></div>;
};

export default hot(App);
