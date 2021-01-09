import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link } from 'react-router-dom';
import { Route, Router } from 'react-router';
import App from './App';
import './App.scss';
import AutoRefresh from './pages/autoRefresh';
import Index from './pages/Index';

ReactDOM.render(
    <HashRouter>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/refresh">refresh</Link>
        </li>
        <Route exact path="/" component={Index} />
        <Route path="/refresh" component={AutoRefresh} />
        <App />
    </HashRouter>,
    document.querySelector('#root'),
);
