import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getS, set, setAll } from '../redux/earn';
import './App.scss';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { originalButton } from './pages/store';


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getS().then(s => {
            console.log("money is ", s.value)
            dispatch(set(s.value || 1))
            dispatch(setAll({
                value: s.value || 1,
                equippedUpgrades: s.equippedUpgrades || [originalButton],
                purchasedUpgrades: s.purchasedUpgrades || []
            }))

        })
    }, [])
    return <div>    <li>
        <Link to="/">Home</Link>
    </li>
        <li>
            <Link to="/LoadOut">LoadOut</Link>
        </li>
        <li>
            <Link to="/store">store</Link>
        </li>
        <Route exact path="/" component={Index} />
        <Route path="/LoadOut" component={LoadOut} />
        <Route path="/store" component={store} /></div>;
};

export default hot(App);
