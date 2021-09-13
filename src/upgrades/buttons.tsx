import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { earn, increment, storageUpgrade } from "../redux/earn"
import { inRange } from "../utils"


export class Upgrade {
    constructor(public name: string, public cost: number, public isButton: boolean) { }
}
export class Equippable extends Upgrade {
    constructor(public name: string, public cost: number) {
        super(name, cost, false)
    }
}
export class Button extends Upgrade {
    constructor(public name: string, public cost: number, public component: React.FC) {
        super(name, cost, true)
    }
}
const ob: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(increment())}>Make Money</button>

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
        dispatch(earn(2));
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
const fdb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    type v = { up: number, right: number }
    const [pos, setPos] = useState<v>({ up: 0, right: 0 })
    const [tPos, setTPos] = useState<v>({ up: 0, right: 0 })
    const [direction, setD] = useState<v>({ up: 0, right: 0 })
    const earnM = () => {
        if (Math.sqrt((pos.right - tPos.right) ** 2 + (pos.up - tPos.up) ** 2) < 5) {
            dispatch(earn(5));
            const r = () => Math.floor((Math.random() * 100));
            setTPos({
                right: r(),
                up: r(),
            })
        } else {
            dispatch(earn(2));
        }
        setPos({
            up: inRange(100, 0, pos.up + direction.up),
            right: inRange(100, 0, pos.right + direction.right),
        })
    }
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight")
            setD({ ...direction, right: inRange(10, 0, direction.right + 1) })
        if (key.key === "ArrowLeft")
            setD({ ...direction, right: inRange(0, -10, direction.right - 1) })
        if (key.key === "ArrowDown")
            setD({ ...direction, up: inRange(0, -10, direction.up - 1) })
        if (key.key === "ArrowUp")
            setD({ ...direction, up: inRange(10, 0, direction.up + 1) })

        earnM()
    }
    const click = () => {
        if (pos.right <= 0)
            setD({ ...direction, right: 10 })
        if (pos.right >= 100)
            setD({ ...direction, right: -10 })
        if (pos.up <= 0)
            setD({ ...direction, up: 10 })
        if (pos.up >= 100)
            setD({ ...direction, up: -10 })
        earnM()
    }
    return <div onKeyDown={keyPress}>
        <div onKeyPress={keyPress}>
            <pre>Direction: {JSON.stringify(direction, null, 4)}</pre> <br />
            <pre>position: {JSON.stringify(pos, null, 4)}</pre> <br />
            <pre>target positon: {JSON.stringify(tPos, null, 4)}</pre> <br />
            <button style={{ marginLeft: `${pos.right}px`, marginTop: `${100 - pos.up}px` }} onClick={click}> - money moves anywhere - </button>
            <div style={{ marginLeft: `${tPos.right}px`, marginTop: `${tPos.up}px`, width: "5px", height: "30px", backgroundColor: "black" }} />
        </div>
    </div>
}

export const originalButton = new Button("original button", 0, ob,)
const betterButton = new Button("better button", 10, bb)
const movingButton = new Button("moving button", 2, mb)
const movingBonusButton = new Button("moving bonus button", 12, mbb)
const allDirectionButton = new Button("all direction moving button", 12, fdb)

export const findButton = (us: storageUpgrade): Button => {
    return upgrades.find(u => u.name === us.name) as Button
}
export const upgrades: Array<Upgrade> = [originalButton, betterButton, movingButton, movingBonusButton, allDirectionButton]
