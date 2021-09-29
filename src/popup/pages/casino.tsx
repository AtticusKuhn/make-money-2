import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { simpleEarn } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { fromMaybe, inRange, maybeParseInt, randomInRange, sleep } from "../../utils"

const SlotNumber: React.FC<{ number: number }> = ({ number }) => {
    return <div style={{ border: "1px solid black", padding: "2px", display: "inline-block", width: "15px" }}>
        {number}
    </div>
}
type s = [number, number, number]
const rules: Record<string, { m: number, f: (a: number, b: number, c: number) => boolean }> = {
    "all the same (10x)": {
        m: 10,
        f: (a, b, c) => (a === b) && (b === c)
    },
    "two the same (5x)": {
        m: 5,
        f: (a, b, c) => (a === b) || (b === c) || (c === a)
    },
    "all even numbers (2x)": {
        m: 2,
        f: (a, b, c) => (a % 2 === 0) && (b % 2 === 0) && (c % 2 === 0)
    }
}
const slotMachineResult = (result: s): { msg: string, multiplier: number } => {
    for (const [name, rule] of Object.entries(rules)) {
        if (rule.f(...result)) {
            return {
                msg: name,
                multiplier: rule.m
            }
        }
    }
    return {
        msg: "You won nothing",
        multiplier: 0,
    }
};
const SlotMachine: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value)
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [val, setVal] = useState<s>([0, 0, 0])
    const [msg, setMsg] = useState<string>("")
    const [spinning, setSpinning] = useState(false)
    const inc = ([a, b, c]: s): s => [
        (a + randomInRange(0, 3)) % 10,
        (b + randomInRange(0, 3)) % 10,
        (c + randomInRange(0, 3)) % 10,
    ];
    const click = async () => {
        const bet = inRange(money, 1, fromMaybe(maybeParseInt(ref.current?.value || "1"), 1))
        ref.current!.value = bet.toString()
        dispatch(simpleEarn(-bet))
        setSpinning(true)
        setMsg("")
        let arr: s = [0, 0, 0]
        for (let i = 0; i < randomInRange(50, 80); i++) {
            arr = inc(arr)
            await sleep(50)
            setVal(arr)
        }
        setSpinning(false)
        const res = slotMachineResult(arr)
        dispatch(simpleEarn(bet * res.multiplier))
        setMsg(res.msg)
    }
    return <>
        <h2>Slot Machine</h2> <br />
        {val.map((v, i) => <SlotNumber key={i} number={v} />)} <br />
        <input ref={ref} placeholder="amount to gamble" /> <br />
        {msg} <br />
        <button disabled={money === 0 || spinning} onClick={click}>Gamble Slot Machine</button>
    </>
}

const Casino: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value)
    return (<>
        <h1>Casino</h1>  <br />
        get ready to gamble (${money}) <br />
        <SlotMachine />
    </>)
}
export default Casino