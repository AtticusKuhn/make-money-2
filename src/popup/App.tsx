import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { storageUpgrade } from '../redux/earn';
import { RootState } from '../redux/store';
import { toCss } from '../upgrades/upgrades';
import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { findPossibleUpgrades } from './pages/store';
import { casino } from '../upgrades/upgrades';
import Casino from './pages/casino';
import Club from './pages/club';
import Tutorial from './pages/tutorial';
const App = () => {
    const l = findPossibleUpgrades().length;
    const msg = l > 0 ? `(${l} upgade${l > 1 ? "s" : ""})` : ""
    const equipped = useSelector<RootState, storageUpgrade[]>(state => state.money.equippedUpgrades)
    const cssString = toCss(equipped)
    const isCasino = equipped.some(x => x.name === casino.name)
    const isBillionaire = equipped.some(x => x.name === "billionaire club")
    const isTutorial = equipped.some(x => x.name === "tutorial")

    return <div id="app" className={`app ${cssString}`}>
        <div className="content">
            <div className="navbar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/LoadOut">Load Out</Link>
                </li>
                <li>
                    <Link to="/store">Store {msg}</Link>
                </li>
                <li>
                    <Link to="/debug">Debug</Link>
                </li>
                {
                    isTutorial
                    &&
                    <li>
                        <Link to="/tutorial">Tutorial</Link>
                    </li>
                }
                {
                    isCasino
                    &&
                    <li>
                        <Link to="/casino">Casino</Link>
                    </li>
                }
                {
                    isBillionaire
                    &&
                    <li>
                        <Link to="/club">Billionaire Club</Link>
                    </li>
                }
            </div>
            <br />
            <Route exact path="/" component={Index} />
            <Route path="/LoadOut" component={LoadOut} />
            <Route path="/debug" component={Debug} />
            <Route path="/store" component={store} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/casino" component={Casino} />
            <Route path="/club" component={Club} />
        </div>
    </div>;
};

export default hot(App);
