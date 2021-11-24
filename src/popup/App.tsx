import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { useSel } from '../redux/store';
import { casino, toCss } from '../upgrades/upgrades';
import './App.scss';
import Casino from './pages/casino';
import Club from './pages/club';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { findPossibleUpgrades } from './pages/store';
import Tutorial from './pages/tutorial';

function useShortcut(isHotKeys: boolean) {
    let history = useHistory();
    useEffect(() => {
        let keys: Record<string, boolean> = {}
        document.onkeydown = (e: KeyboardEvent) => {
            keys[e.key.toLowerCase()] = true;
            // console.log(e.target.tagName)
            //@ts-ignore
            if (e.target.tagName !== "BODY") {

            }
            // console.log("keyup")
            // console.log(keys)
            if (isHotKeys) {
                if (keys["h"] && keys["shift"]) history.push("/")
                if (keys["l"] && keys["shift"]) history.push("LoadOut")
                if (keys["d"] && keys["shift"]) history.push("/debug")
                if (keys["s"] && keys["shift"]) history.push("/store")
                if (keys["t"] && keys["shift"]) history.push("/tutorial")
                if (keys["c"] && keys["shift"]) history.push("/casino")
                if (keys["b"] && keys["shift"]) history.push("/club")
            }
        }
        document.onkeyup = (e) => {
            keys[e.key.toLowerCase()] = false;
        };
    }, [isHotKeys])
};
interface NavButtonProps {
    text: string;
    link: string;
}
const NavButton: React.FC<NavButtonProps> = ({ text, link }) => {
    const location = useLocation()
    return <div className={`navbutton ${location.pathname === link ? "active" : "inactive"}`}>
        <Link className="nav-button" to={link}>
            {text}
        </Link>
    </div>;
}
const Header: React.FC<{}> = () => {
    const eq = new Array(60).fill("=")
    const money = useSel(state => state.money.value)
    return <div style={{ width: "70%" }}>
        {eq}
        <div style={{ transition: "300ms", fontSize: "30px", marginLeft: `${money % 100}%` }}>$</div>
        {eq}
    </div>
}
const App: React.FC<{}> = () => {
    const l = findPossibleUpgrades().length;
    const msg = l > 0 ? `(${l} upgrade${l > 1 ? "s" : ""})` : ""
    const equipped = useSel(state => state.money.equippedUpgrades)
    const cssString = toCss(equipped)
    const isCasino = equipped.some(x => x.name === casino.name)
    const isBillionaire = equipped.some(x => x.name === "billionaire club")
    const isTutorial = equipped.some(x => x.name === "tutorial")
    const isHeader = equipped.some(x => x.name === "header")
    const isHotKeys = equipped.some(x => x.name === "hot keys")
    // if (isHotKeys) {
    useShortcut(isHotKeys)
    // }
    return <div id="app" className={`app default ${cssString}`}>
        <div className="content">
            {isHeader && <Header />}
            <div className="navbar" style={{ marginTop: "12px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: "0 12px" }}>
                <NavButton link="/" text="Home" />
                <NavButton link="/LoadOut" text="Load Out" />
                <NavButton link="/store" text={`Store ${msg}`} />
                <NavButton link="/debug" text="Debug" />
                {isTutorial && <NavButton link="/tutorial" text="Tutorial" />}
                {isCasino && <NavButton link="/casino" text="Casino" />}
                {isBillionaire && <NavButton link="/club" text="Billionaire Club" />}
            </div>
            <br />
            <div className="body">
                <Route exact path="/" component={Index} />
                <Route path="/LoadOut" component={LoadOut} />
                <Route path="/debug" component={Debug} />
                <Route path="/store" component={store} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/casino" component={Casino} />
                <Route path="/club" component={Club} />
            </div>
        </div>
    </div>;
};

export default hot(App);
