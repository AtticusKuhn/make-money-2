import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { earn, storageUpgrade } from "../redux/earn"
import { upgradeType } from "../types"
import { distance, inRange, randomInRange, sleep, toDirection } from "../utils"

export class Upgrade {
    constructor(public name: string, public cost: number, public type: upgradeType) { }
}
export class Equippable extends Upgrade {
    constructor(public name: string, public cost: number) {
        super(name, cost, upgradeType.upgrade)
    }
}
export class Button extends Upgrade {
    constructor(public name: string, public cost: number, public component: React.FC) {
        super(name, cost, upgradeType.button)
    }
}
const maxPrice = 100e15;
const numOfButtons = 9;
const getPrice = (index: number): number => Math.floor(Math.exp(index / (numOfButtons / Math.log(maxPrice))) - 1);
const timePerButton = (num: number): number => 2 * num + 1;


const ob: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const obcpm = 1014;
    const obearn = getPrice(1) / (timePerButton(0) * obcpm);
    return <button onClick={() => dispatch(earn(obearn))}>Make Money</button>

}
const bb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const bbcpm = 1014;
    const bbearn = getPrice(2) / (timePerButton(1) * bbcpm);
    return <div className="betterButton"><button onClick={() => dispatch(earn(bbearn))}>Make More Money</button>
        <style>{`
    .betterButton {
        margin-left: 40%;
    }
    `}</style>
    </div>
}
const mb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [left, setLeft] = useState(0)
    const [direction, setD] = useState<"left" | "right">("left")
    const r = () => setLeft(Math.min(left + 5, 100))
    const l = () => setLeft(Math.max(left - 5, 0))
    const mbcpm = 1014;
    const mbearn = getPrice(3) / (timePerButton(2) * mbcpm);
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight") {
            r();
            setD("right")
        }
        if (key.key === "ArrowLeft") {
            l();
            setD("left")
        }
        dispatch(earn(mbearn));
    }
    const click = () => {
        dispatch(earn(2));
        if (left <= 0)
            setD("right")
        if (left >= 100)
            setD("left")
        if (direction === "right")
            return r()
        l();
    }
    return <div onKeyDown={keyPress}>
        <div onKeyPress={keyPress}>
            <button style={{ marginLeft: `${left}px` }} onClick={click}> - moving money - </button>
        </div>
    </div>
}
const mbb: React.FC<{}> = () => {
    const mbbcpm = 3036;
    const mbbearn = (1 / 3) * (getPrice(4) / (timePerButton(3) * mbbcpm));
    const dispatch = useDispatch()
    const [left, setLeft] = useState(0)
    const [tLeft, setTLeft] = useState(50)
    const [direction, setD] = useState<"left" | "right">("left")
    const r = () => setLeft(Math.min(left + 5, 100))
    const l = () => setLeft(Math.max(left - 5, 0))
    const earnM = () => {
        if (Math.abs(left - tLeft) < 5) {
            dispatch(earn(2 * mbbearn));
            setTLeft(Math.floor((Math.random() * 100)))
        } else {
            dispatch(earn(mbbearn));
        }
    }
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight") {
            r();
            setD("right")
        }
        if (key.key === "ArrowLeft") {
            l();
            setD("left")
        }
        earnM()
    }
    const click = () => {
        earnM()
        if (left <= 0)
            setD("right")
        if (left >= 100)
            setD("left")
        if (direction === "right")
            return r()
        l();
    }
    return <div onKeyDown={keyPress}>
        <div onKeyPress={keyPress}>
            <button style={{ transition: "300ms", marginLeft: `${left}px` }} onClick={click}> - moving money - </button>
            <div style={{ marginLeft: `${tLeft}px`, width: "5px", height: "30px", backgroundColor: "black" }} />
        </div>
    </div>
}
export type v = { up: number, right: number }

const fdb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [pos, setPos] = useState<v>({ up: 0, right: 0 })
    const r = () => Math.floor((Math.random() * 100));
    const [tPos, setTPos] = useState<v>({
        right: r(),
        up: r(),
    })
    // const [direction, setD] = useState<v>({ up: 0, right: 0 })
    const earnM = () => {
        let a = tPos.right - pos.right
        let b = pos.up - tPos.up;
        console.log({ a, b })
        console.log(`(a > 0 && a < 30)
        &&
        (b > 0 && b < 30)`, (a > 0 && a < 30)
        &&
        (b > 0 && b < 30))
        if (
            (a > 0 && a < 30)
            &&
            (b > 0 && b < 30)
        ) {
            dispatch(earn(300));
            setTPos({
                right: r(),
                up: r(),
            })
        } else {
            dispatch(earn(1));
        }
        // setPos({
        //     up: inRange(100, 0, pos.up + direction.up),
        //     right: inRange(100, 0, pos.right + direction.right),
        // })
        // setD({
        //     right: 0,
        //     up: 0,
        // })
    }
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        const dir = toDirection(key)
        if (dir === "right") {
            setPos({ up: pos.up, right: inRange(100, 0, pos.right + 10) })
        } else if (dir === "left") {
            setPos({ up: pos.up, right: inRange(100, 0, pos.right - 10) })
        } else if (dir === "down") {
            setPos({ right: pos.right, up: inRange(100, 0, pos.up - 10) })
        } else if (dir === "up") {
            setPos({ right: pos.right, up: inRange(100, 0, pos.up + 10) })
        } else {
            click()
        }
        earnM()
    }
    const click = () => {
        if (pos.right <= 0) {
            setPos({ ...pos, right: inRange(100, 0, pos.right + 10) })
        } else if (pos.right >= 100) {
            setPos({ ...pos, right: inRange(100, 0, pos.right - 10) })
        } else if (pos.up <= 0) {
            setPos({ ...pos, up: inRange(100, 0, pos.up + 10) })
        } else if (pos.up >= 100) {
            setPos({ ...pos, up: inRange(100, 0, pos.up - 10) })
        } else {
            setPos({ right: inRange(100, 0, pos.right + 10), up: inRange(100, 0, pos.up + 10) })
        }
        earnM()
    }
    return <div onKeyDown={keyPress} style={{ height: "200px" }}>
        <div onKeyPress={keyPress} style={{ height: "200px" }}>
            <p>right off: {tPos.right - pos.right}</p>
            <p>up off: {tPos.up - pos.up}</p>
            <p>post: {JSON.stringify(pos)}</p>

            <div style={{ position: "absolute", marginLeft: `${tPos.right - 5}px`, marginTop: `${100 - tPos.up + 5}px`, width: "10px", height: "10px", backgroundColor: "black" }} />
            <button style={{ width: "57px", height: "content", marginLeft: `${pos.right}px`, marginTop: `${100 - pos.up}px`, marginBottom: `${pos.up}px` }} onClick={click}>cubechat</button>
            {/* <div style={{ position: "absolute",  backgroundColor: "red", width: "57px", height: "57px", marginLeft: `${pos.right}px`, marginTop: `${100 - pos.up}px`, marginBottom: `${pos.up}px` }} /> */}

        </div>
    </div>
}
const tb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const getSentence = async (): Promise<string> => {
        const req1 = await fetch("https://en.wikipedia.org/wiki/Special:Random/", {
            mode: "no-cors",
        })
        const data = await req1.text()
        const document = new DOMParser().parseFromString(data, "text/html")
        const paras = [...document.querySelectorAll("p")]
        const text = paras.map(x => x.innerText).join(" ").substring(0, 100)
        console.log("text is", text)
        return text.trim();
    }
    const [currentSentence, setCurrentSentence] = useState<string>("I like apple pie")
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = async (key) => {
        console.log("recieved", key.key, "expecting", currentSentence[0])
        if (currentSentence.length === 0)
            return;
        if (key.key === currentSentence[0]) {
            dispatch(earn(16))
            setCurrentSentence(currentSentence.slice(1))
            if (currentSentence.length <= 1)
                setCurrentSentence(await getSentence())
        } else {
            dispatch(earn(1))
        }
    }
    return <div onKeyDown={keyPress} style={{ height: "200px" }}>
        <div onKeyPress={keyPress} style={{ height: "200px" }}>
            <button onClick={() => dispatch(earn(1))}>What is the "type" of money?</button>
            <br />
            <pre>{currentSentence}</pre>
        </div>
    </div>
}
const sb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [left, setLeft] = useState<number>(300)
    const [height, setHeight] = useState<number>(200)
    const [v, setV] = useState<number>(0)
    const [ob, setob] = useState<number>(randomInRange(5, 9))
    const run = () => {
        console.log("run called, l is", left, "and h is", height)
        setLeft(left - ob)
        setHeight(Math.max(0, height + v));
        setV(Math.max(-20, v - 1))
        if (left <= 0) {
            console.log("left is negative, resetting to 200")
            setLeft(300)
            setob(randomInRange(5, 9))
        }
        if (left <= 40 && height <= 10) {
            dispatch(earn(-10))
        }
    }
    const click = () => {
        if (height === 0) {
            setV(10)
            dispatch(earn(100))
        }
    }
    useEffect(() => {
        console.log("useEffect called in scrolling button")
        const gameLoop = setInterval(run, 30)
        return () => clearInterval(gameLoop);
    }, [height, left, v])
    return (<>
        <div className="holder">
            <div style={{ marginTop: "100px", marginBottom: "20px", position: "absolute", marginLeft: `${left}px`, width: "5px", height: "30px", backgroundColor: "red" }} />
            <button style={{ width: "37px", height: "20px", position: "relative", marginBottom: `${height}px`, marginTop: `${100 - height}px` }} onClick={click}>jump</button>
        </div>
    </>)
}
const sdb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [buttonPosition, setButtonPosition] = useState<number>(0)
    const [Bdirection, setBDirection] = useState<"left" | "right">("right")
    const [enemyPosition, setEnemyPosition] = useState<v>({ right: 0, up: 100 })
    const [bulletPosition, setBulletPosition] = useState<v>({ right: 0, up: 0 })
    const [isBulletVisible, setBulletVisible] = useState<boolean>(false)
    const [enemyDirection, setEnemyDirection] = useState<v>({ right: -10, up: -2 })
    const run = () => {
        setEnemyPosition({
            right: enemyPosition.right + enemyDirection.right,
            up: enemyPosition.up + enemyDirection.up
        })
        if (enemyPosition.right >= 100) {
            setEnemyDirection({ right: -10, up: enemyDirection.up })
        }
        if (enemyPosition.right <= 0) {
            setEnemyDirection({ right: 10, up: enemyDirection.up })
        }
        if (enemyPosition.up <= 0) {
            dispatch(earn(-10))
            setEnemyPosition({ right: 0, up: 300 })
        }
        if (isBulletVisible) {
            setBulletPosition({
                up: bulletPosition.up + 5,
                right: bulletPosition.right
            })
        }
        if (distance(bulletPosition, enemyPosition) <= 20 && isBulletVisible) {
            setEnemyPosition({ right: 0, up: 300 })
            setBulletPosition({ right: 0, up: 0 })
            setBulletVisible(false)
            dispatch(earn(200));
        }
        if (bulletPosition.up >= 300) {
            setBulletVisible(false)
            setBulletPosition({ right: 0, up: 0 })
        }
    }
    const r = () => setButtonPosition(Math.min(buttonPosition + 5, 100))
    const l = () => setButtonPosition(Math.max(buttonPosition - 5, 0))
    const keyPress: React.KeyboardEventHandler<any> = (key) => {
        // alert(key.key)
        if (toDirection(key) === "right") {
            r();
            setBDirection("right")
        } else if (toDirection(key) === "left") {
            l();
            setBDirection("left")
        } else if (key.key === "w" || key.key === "Space" || key.key === "Enter") {
            if (!isBulletVisible) {
                setBulletVisible(true)
                setBulletPosition({
                    up: bulletPosition.up,
                    right: buttonPosition,
                })
            }
            click()

        } else {
            click()
            // r();
            // setBDirection("right")
        }
        dispatch(earn(2));
    }
    const click = () => {
        if (!isBulletVisible) {
            setBulletVisible(true)
            setBulletPosition({
                up: bulletPosition.up,
                right: buttonPosition,
            })
        }
        dispatch(earn(2));
        if (buttonPosition <= 0)
            setBDirection("right")
        if (buttonPosition >= 100)
            setBDirection("left")
        if (Bdirection === "right") {
            return r()
        } else {
            l();
        }
    }
    useEffect(() => {
        const gameLoop = setInterval(run, 30)
        return () => clearInterval(gameLoop);
    }, [enemyDirection, enemyPosition, bulletPosition])
    return (<>
        <div onKeyPress={keyPress} className="holder" style={{ height: "300px" }}>
            <div className="enemey" style={{ marginTop: `${300 - enemyPosition.up}px`, position: "absolute", marginLeft: `${enemyPosition.right}px`, width: "10px", height: "10px", backgroundColor: "red" }} />
            <div className="bullet" style={{ display: (!isBulletVisible ? "none" : "block"), marginTop: `${300 - bulletPosition.up}px`, position: "absolute", marginLeft: `${bulletPosition.right}px`, width: "7px", height: "7px", backgroundColor: "orange" }} />
            <button style={{ width: "45px", height: "20px", position: "relative", marginTop: "300px", marginLeft: `${buttonPosition}px` }} onClick={click}>shoot</button>
        </div>
    </>)
}
const ghb: React.FC<{}> = () => {
    const speed = 3
    const height = 300
    const interval = 50
    const width = 200
    const randomPos = (): v => ({ up: height, right: Math.floor(Math.random() * (width / interval)) * interval })
    const [enemyPositions, setEnemyPositions] = useState<v[]>(new Array(5).fill(0).map((_e, i) => ({ right: randomPos().right, up: i * 60 + 100 })))
    const [playerPosititon, setPlayPosition] = useState<number>(0)
    const dispatch = useDispatch();
    const click = () => {
        setPlayPosition((playerPosititon + interval) % width)
        dispatch(earn(10))
    }
    const moveEnemy = (pos: v): v => {
        pos.up -= speed
        if (pos.up <= 0) {
            if (playerPosititon !== pos.right) {
                dispatch(earn(-10))
            } else {
                dispatch(earn(10))
            }
            pos = randomPos()
        }
        return pos;
    }
    useEffect(() => {
        (async () => {
            await sleep(50)
            setEnemyPositions(enemyPositions.map(moveEnemy))
        })()
    }, [enemyPositions])
    return <>
        <div style={{ height: `${height + 30}px`, overflow: "hidden" }}>
            {enemyPositions.map(enemyPosition => <div className="enemey" style={{ marginTop: `${height - enemyPosition.up}px`, position: "absolute", marginLeft: `${enemyPosition.right}px`, width: `${interval}px`, height: "10px", backgroundColor: "red" }} />)}
            <button onClick={click} style={{ position: "relative", marginTop: `${height}px`, marginLeft: `${playerPosititon}px`, width: `${interval}px` }}>move</button>
        </div>
    </>
}

export const originalButton = new Button("original button", getPrice(0), ob,)
const betterButton = new Button("better button", getPrice(1), bb)
const movingButton = new Button("moving button", getPrice(2), mb)
const movingBonusButton = new Button("moving bonus button", getPrice(3), mbb)
const allDirectionButton = new Button("cubechat button", getPrice(4), fdb)
const typingButton = new Button("typing button", getPrice(5), tb)
const scrollingButton = new Button("scrolling button", getPrice(6), sb)
const guitarHeroButton = new Button("guitar hero button", getPrice(7), ghb)
const spaceDefenderButton = new Button("space defender button", getPrice(8), sdb)

export const findButton = (us: storageUpgrade): Button => {
    return upgrades.find(u => u.name === us.name) as Button
}
export const upgrades: Array<Button> = [originalButton, betterButton, movingButton, movingBonusButton, allDirectionButton, typingButton, scrollingButton, guitarHeroButton, spaceDefenderButton]
