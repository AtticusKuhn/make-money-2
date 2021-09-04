import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getS, set } from '../redux/earn';
import './App.scss';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store from './pages/store';


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getS().then(s => {
            console.log("money is ", s.money)
            dispatch(set(s.money || 1))
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
