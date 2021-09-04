import { createMemoryHistory } from 'history';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import './App.scss';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store from './pages/store';

const history = createMemoryHistory();

const App = () => {
    console.log({ history });
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
