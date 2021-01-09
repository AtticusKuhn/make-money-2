import { createMemoryHistory } from 'history';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router } from 'react-router';
import { Link } from 'react-router-dom';
import './App.scss';
import AutoRefresh from './pages/autoRefresh';
import Index from './pages/Index';

const history = createMemoryHistory();
// const NavBar = ({ setPath }) => {
//     const pages = ['index', 'AutoRefresh'];
//     return (
//         <>
//             {' '}
//             <h1>hello</h1>
//             {pages.map((page) => {
//                 return (
//                     <>
//                         <h1>hello</h1>
//                     </>
//                 );
//             })}
//             ;
//         </>
//     );
// };
// const Router = () => {
//     const [path, setPath] = useState('');

//     if (path === '') {
//         return (
//             <>
//                 <NavBar setPath={setPath} />
//                 <Index />
//             </>
//         );
//     } else if (path === 'AutoRefresh') {
//         return <AutoRefresh />;
//     }
// };
const App = () => {
    console.log({ history });
    return <div>{/* <Router history={history}>
              
            </Router> */}</div>;
};

export default hot(App);
