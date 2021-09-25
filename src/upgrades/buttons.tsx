import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { earn, storageUpgrade } from "../redux/earn"
import { upgradeType } from "../types"
import { distance, inRange, randomInRange, toDirection } from "../utils"


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
const ob: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(earn(1))}>Make Money</button>

}
const bb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(earn(2))}>Make More Money</button>
}
const mb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [left, setLeft] = useState(0)
    const [direction, setD] = useState<"left" | "right">("left")
    const r = () => setLeft(Math.min(left + 5, 100))
    const l = () => setLeft(Math.max(left - 5, 0))
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight") {
            r();
            setD("right")
        }
        if (key.key === "ArrowLeft") {
            l();
            setD("left")
        }
        dispatch(earn(7));
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
    const dispatch = useDispatch()
    const [left, setLeft] = useState(0)
    const [tLeft, setTLeft] = useState(50)
    const [direction, setD] = useState<"left" | "right">("left")
    const r = () => setLeft(Math.min(left + 5, 100))
    const l = () => setLeft(Math.max(left - 5, 0))
    const earnM = () => {
        if (Math.abs(left - tLeft) < 5) {
            dispatch(earn(5));
            setTLeft(Math.floor((Math.random() * 100)))
        } else {
            dispatch(earn(2));
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
    const [direction, setD] = useState<v>({ up: 0, right: 0 })
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
        setPos({
            up: inRange(100, 0, pos.up + direction.up),
            right: inRange(100, 0, pos.right + direction.right),
        })
        // setD({
        //     right: 0,
        //     up: 0,
        // })
    }
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight")
            setD({ up: 0, right: 10 })
        if (key.key === "ArrowLeft")
            setD({ up: 0, right: -10 })
        if (key.key === "ArrowDown")
            setD({ right: 0, up: -10 })
        if (key.key === "ArrowUp")
            setD({ right: 0, up: 10 })
        earnM()
    }
    const click = () => {
        if (pos.right <= 0)
            setD({ ...direction, right: 10, })
        if (pos.right >= 100)
            setD({ ...direction, right: -10 })
        if (pos.up <= 0)
            setD({ ...direction, up: 10 })
        if (pos.up >= 100)
            setD({ ...direction, up: -10 })
        earnM()
    }
    return <div onKeyDown={keyPress} style={{ height: "200px" }}>
        <div onKeyPress={keyPress} style={{ height: "200px" }}>
            {/* {JSON.stringify(direction)} */}
            <div style={{ position: "absolute", marginLeft: `${tPos.right - 5}px`, marginTop: `${100 - tPos.up + 5}px`, width: "10px", height: "10px", backgroundColor: "black" }} />
            <button style={{ width: "57px", height: "57px", marginLeft: `${pos.right}px`, marginTop: `${100 - pos.up}px`, marginBottom: `${pos.up}px` }} onClick={click}>money moves anywhere</button>
        </div>
    </div>
}
const tb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const getSentence = (): string => "I like apple pie"
    const [currentSentence, setCurrentSentence] = useState<string>(getSentence())
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === currentSentence[0]) {
            dispatch(earn(16))
            setCurrentSentence(currentSentence.slice(1))
        } else {
            dispatch(earn(1))
        }
        if (currentSentence.length === 0)
            setCurrentSentence(getSentence())
    }
    return <div onKeyDown={keyPress} style={{ height: "200px" }}>
        <div onKeyPress={keyPress} style={{ height: "200px" }}>
            <button onClick={() => dispatch(earn(1))}>What is the "type" of money?</button>
            <br />{currentSentence}
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
        if (distance(bulletPosition, enemyPosition) <= 20) {
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
        } else {
            r();
            setBDirection("right")
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
        if (Bdirection === "right")
            return r()
        l();
    }
    useEffect(() => {
        const gameLoop = setInterval(run, 30)
        return () => clearInterval(gameLoop);
    }, [enemyDirection, enemyPosition, bulletPosition])
    return (<>
        <div onKeyPress={keyPress} className="holder" style={{ height: "300px" }}>
            {/* <div onKeyPress={keyPress}> */}

            {/* button positition {buttonPosition} <br /> */}
            {/* button direction {Bdirection} <br /> */}
            {/* enemy position {JSON.stringify(enemyPosition)} <br />
            enemeny direction {JSON.stringify(enemyDirection)} <br />
            bullet pos {JSON.stringify(bulletPosition)} <br />
            bullet visible {JSON.stringify(isBulletVisible)} <br />
            Distance {distance(bulletPosition, enemyPosition)} <br /> */}

            <div className="enemey" style={{ marginTop: `${300 - enemyPosition.up}px`, position: "absolute", marginLeft: `${enemyPosition.right}px`, width: "10px", height: "10px", backgroundColor: "red" }} />
            <div className="bullet" style={{ marginTop: `${300 - bulletPosition.up}px`, position: "absolute", marginLeft: `${bulletPosition.right}px`, width: "7px", height: "7px", backgroundColor: "orange" }} />

            <button style={{ width: "45px", height: "20px", position: "relative", marginTop: "300px", marginLeft: `${buttonPosition}px` }} onClick={click}>shoot</button>
            {/* </div> */}
        </div>
    </>)
}
export const originalButton = new Button("original button", 0, ob,)
const betterButton = new Button("better button", 20, bb)
const movingButton = new Button("moving button", 150, mb)
const movingBonusButton = new Button("moving bonus button", 450, mbb)
const allDirectionButton = new Button("cubechat button", 700, fdb)
const typingButton = new Button("typing button", 2000, tb)
const scrollingButton = new Button("scrolling button", 3000, sb)
const spaceDefenderButton = new Button("space defender button", 100, sdb)

export const findButton = (us: storageUpgrade): Button => {
    return upgrades.find(u => u.name === us.name) as Button
}
export const upgrades: Array<Button> = [originalButton, betterButton, movingButton, movingBonusButton, allDirectionButton, typingButton, scrollingButton, spaceDefenderButton]
