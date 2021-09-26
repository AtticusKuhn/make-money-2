import React, { useRef, useState } from "react"
import { sleep } from "../../utils"

const SlotNumber: React.FC<{ number: number }> = ({ number }) => {
    return <div style={{ border: "1px solid black", padding: "2px", display: "block" }}>
        {number}

    </div>
}

const SlotMachine: React.FC<{}> = () => {
    const ref = useRef<HTMLInputElement>(null)
    // const __v: number = parseInt(ref?.current?.value || "1")
    type s = [number, number, number]
    const [val, setVal] = useState<s>([0, 0, 0])
    const valRef = useRef<s>([0, 0, 0]);
    valRef.current = val;
    const [spinning, setSpinning] = useState(false)
    const click = async () => {
        setSpinning(true)
        for (let i = 10; i < 100; i++) {
            await sleep(i * 10)
            const newVal: s = [
                (valRef.current[0] + 1) % 10,
                (valRef.current[1] + 3) % 10,
                (valRef.current[2] + 7) % 10,
            ]
            setVal(newVal)
        }
        setSpinning(false)
    }
    return <>
        {val.map((v, i) => <SlotNumber key={i} number={v} />)} <br />
        {JSON.stringify(val)}
        <input ref={ref} placeholder="amount to gamble" /> <br />
        <button disabled={spinning} onClick={click}>Gamble Slot Machine</button>
    </>
}

const Casino: React.FC<{}> = () => {
    return (<>
        <h1>Casino</h1>  <br />
        get ready to gamble <br />
        <SlotMachine />

    </>)
}
export default Casino