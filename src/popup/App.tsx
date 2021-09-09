import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getS, setAll, storageUpgrade } from '../redux/earn';
import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { Upgrade, upgrades } from './pages/store';
//s
const tmp = (a: storageUpgrade[]): storageUpgrade[] => {
    console.log("a", a)
    console.log("a.map", a.map)
    return a.map(u => upgrades.find(x => x?.name === u?.name) as Upgrade).map(e => ({ name: e?.name, isButton: e.isButton })) || [{ name: "original button", isButton: true }]
}
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getS().then(s => {
            // dispatch(setAll({
            //     value: 12,
            //     equippedUpgrades: [{ name: "original button" }],
            //     purchasedUpgrades: [{ name: "original button" }],
            // }))
            // return;
            if (!s) {
                dispatch(setAll({
                    value: 1,
                    equippedUpgrades: [{ name: "original button", isButton: true }],
                    purchasedUpgrades: [{ name: "original button", isButton: true }],
                }))
                return;
            }
            console.log("money is ", s.value)
            console.log("s", s)
            const ne = tmp(Array.from(s.equippedUpgrades || [{ name: "original button", isButton: true }]));
            const np = tmp(Array.from(s.purchasedUpgrades || [{ name: "original button", isButton: true }]));
            console.log({ ne, np })
            // debugger;
            // dispatch(set(s.value || ee1))
            dispatch(setAll({
                value: s.value || -1,
                equippedUpgrades: ne,//[{ name: "original button" }],
                purchasedUpgrades: np,//[{ name: "original button" }],
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
