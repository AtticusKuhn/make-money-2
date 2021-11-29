import React, { useEffect, useRef, useState } from "react"
import { simpleEarn } from "../../redux/earn"
import { useDisp, useSel } from "../../redux/store"
import { formatNumber, fromMaybe, inRange, maybeParseInt, randomInRange, sleep } from "../../utils"

const SlotNumber: React.FC<{ number: number }> = ({ number }) => {
    return <div style={{ margin: "0px", border: "1px solid black", fontSize: "40px", display: "inline-block", width: "40px", height: "50px" }}>
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
    const money = useSel(state => state.money.value)
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useDisp()
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
    return <div className="btn-center" style={{ alignItems: "center", alignContent: "center" }}>
        <h2>Slot Machine</h2> <br /> <br /><br /><br /><br />
        {val.map((v, i) => <SlotNumber key={i} number={v} />)} <br /><br /><br /><br />
        <input ref={ref} placeholder="amount to gamble" /> <br /><br />
        {msg} <br /><br /><br />
        <button className="btn" disabled={money === 0 || spinning} onClick={click}>Gamble Slot Machine</button><br /><br /><br /><br />
    </div>
}
const RouletteWheel: React.FC<{}> = () => {
    // const money = useSel(state => state.money.value)
    const money = useSel(state => state.money.value)
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const dispatch = useDisp()
    const radius = 120;
    let options: number[] = new Array(10).fill(0).map((_e, i) => Math.floor((i - 5)));
    let startAngle = 0;
    let arc = Math.PI / (options.length / 2);
    let spinTimeout: number = 0;
    let spinTime = 0;
    let spinTimeTotal = 0;
    let ctx: CanvasRenderingContext2D;
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // const canvas = canvasRef!.current as HTMLCanvasElement
    const getColor = (item: number, maxItem: number): string => `hsl(${item * 360 / maxItem},70%, 50%)`;
    function drawRouletteWheel() {
        // let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // if (canvasRef.current.getContext) {
        let outsideRadius = radius + 10;
        let textRadius = radius - 3;
        let insideRadius = radius / 2;
        ctx = canvasRef!.current!.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, 2 * radius, 2 * radius);
        ctx.strokeStyle = "black";
        for (let i = 0; i < options.length; i++) {
            let angle = startAngle + i * arc;
            ctx.fillStyle = getColor(i, options.length);
            ctx.beginPath();
            ctx.arc(radius + 10, radius + 10, outsideRadius, angle, angle + arc, false);
            ctx.arc(radius + 10, radius + 10, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            // ctx.shadowColor = "rgb(220,220,220)";
            ctx.fillStyle = "black";
            ctx.translate(radius + Math.cos(angle + arc / 2) * textRadius,
                radius + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            let text = options[i];
            ctx.font = '20px serif';
            ctx.fillText(`${text}`, -ctx.measureText(text.toString()).width / 2 - 7, 30);
            ctx.restore();
        }
        // }
    }
    let spinAngleStart = 0;
    function spin() {
        setIsSpinning(true)
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        rotateWheel();
    }
    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        //@ts-ignore
        spinTimeout = setTimeout(() => rotateWheel(), 30);
    }
    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        let degrees = startAngle * 180 / Math.PI + 90;
        let arcDegrees = arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcDegrees);
        ctx.save();
        let text = options[index]
        ctx.font = 'bold 15px Helvetica, Arial';
        ctx.fillText(`${text}%`, radius - ctx.measureText(text.toString()).width / 2, radius + 10);
        dispatch(simpleEarn((text / 100) * money))
        ctx.restore();
        setIsSpinning(false)
    }
    function easeOut(t: number, b: number, c: number, d: number): number {
        let ts = (t /= d) * t;
        let tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }
    useEffect(() => {
        console.log(canvasRef.current)
        if (canvasRef.current) {
            canvasRef.current.width = 2 * radius + 20;
            canvasRef.current.height = 2 * radius + 20;
            canvasRef.current.style.width = `${2 * radius + 20}px`;
            canvasRef.current.style.height = `${2 * radius + 20}px`;
        }
        drawRouletteWheel();
    }, [canvasRef])
    return <div className="btn-center">
        <h1>Roulette Wheel</h1>
        <canvas ref={canvasRef} id="canvas" width={(2 * radius + 20).toString()} height={(2 * radius + 20).toString()} />
        <br /> <br />
        <button onClick={spin} disabled={money === 0 || isSpinning} className="btn" type="button" value="spin the wheel" style={{ float: "left" }} id='spin'>Spin the Wheel!</button>
    </div>
}
const Casino: React.FC<{}> = () => {
    const money = useSel(state => state.money.value)
    return (<>
        <h1>Casino</h1>  <br />
        get ready to gamble (${formatNumber(money)}) <br />
        <div className="btn-center">
            <SlotMachine />
        </div>
        <div className="btn-center">
            <RouletteWheel />
        </div>
    </>)
}
export default Casino