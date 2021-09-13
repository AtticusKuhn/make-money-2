import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { storageUpgrade } from '../redux/earn';
import { RootState } from '../redux/store';
import { darkMode } from '../upgrades/upgrades';
import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { findPossibleUpgrades } from './pages/store';

const App = () => {
    const l = findPossibleUpgrades().length;
    const msg = l > 0 ? `(${l} upgade${l > 1 ? "s" : ""} available)` : ""
    const isDarkMode = useSelector<RootState, storageUpgrade[]>(state => state.money.equippedUpgrades).some(u => u.name === darkMode.name)
    const cl = isDarkMode ? "darkTheme" : "lightTheme";
    return <div id="app" className={`app ${cl}`}>
        <div className="content">
            <li>
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

            <Route path="/store" component={store} />
        </div>
    </div>;
};

export default hot(App);
