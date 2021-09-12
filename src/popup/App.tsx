import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { getPossibleUpgrades } from './pages/store';

const App = () => {
    const money = useSelector<RootState, number>((state) => state.money.value)
    const l = getPossibleUpgrades(money).length;
    const msg = l > 0 ? `(${l} upgades available)` : ""
    return <div className="app">    <li>
        <Link to="/">Home</Link>
    </li>
        <li>
            <Link to="/LoadOut">LoadOut</Link>
        </li>
        <li>
            <Link to="/store">store {msg}</Link>
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
