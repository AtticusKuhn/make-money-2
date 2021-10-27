import React, { useEffect, useRef, useState } from "react"
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
const RouletteWheel: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value)
    const dispatch = useDispatch()
    useEffect(() => {
        var options: number[] = new Array(10).fill(0).map((_e, i) => Math.floor((i - 5) * (money / 1000)));
        var startAngle = 0;
        var arc = Math.PI / (options.length / 2);
        var spinTimeout: number = 0;
        var spinTime = 0;
        var spinTimeTotal = 0;
        var ctx: CanvasRenderingContext2D;
        document.getElementById("spin")!.addEventListener("click", spin);
        const getColor = (item: number, maxItem: number): string => `hsl(${item * 360 / maxItem},70%, 50%)`;
        function drawRouletteWheel() {
            var canvas = document.getElementById("canvas") as HTMLCanvasElement;
            if (canvas.getContext) {
                var outsideRadius = 200;
                var textRadius = 160;
                var insideRadius = 95;
                ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
                ctx.clearRect(0, 0, 380, 380);
                ctx.strokeStyle = "black";
                for (var i = 0; i < options.length; i++) {
                    var angle = startAngle + i * arc;
                    ctx.fillStyle = getColor(i, options.length);
                    ctx.beginPath();
                    ctx.arc(190, 190, outsideRadius, angle, angle + arc, false);
                    ctx.arc(190, 190, insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    ctx.save();
                    ctx.shadowOffsetX = -1;
                    ctx.shadowOffsetY = -1;
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = "rgb(220,220,220)";
                    ctx.fillStyle = "black";
                    ctx.translate(190 + Math.cos(angle + arc / 2) * textRadius,
                        190 + Math.sin(angle + arc / 2) * textRadius);
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    var text = options[i];
                    ctx.fillText(text.toString(), -ctx.measureText(text.toString()).width / 2, 0);
                    ctx.restore();
                }
            }
        }
        let spinAngleStart = 0;
        function spin() {
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
            var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
            startAngle += (spinAngle * Math.PI / 180);
            drawRouletteWheel();
            //@ts-ignore
            spinTimeout = setTimeout(() => rotateWheel(), 30);
        }
        function stopRotateWheel() {
            clearTimeout(spinTimeout);
            var degrees = startAngle * 180 / Math.PI + 90;
            var arcDegrees = arc * 180 / Math.PI;
            var index = Math.floor((360 - degrees % 360) / arcDegrees);
            ctx.save();
            var text = options[index]
            ctx.font = 'bold 15px Helvetica, Arial';
            ctx.fillText(text.toString(), 190 - ctx.measureText(text.toString()).width / 2, 190 + 10);
            dispatch(simpleEarn(text))
            ctx.restore();
        }
        function easeOut(t: number, b: number, c: number, d: number): number {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        }
        drawRouletteWheel();
    }, [])
    return <>
        <canvas id="canvas" width="380" height="380" />
        <input type="button" value="spin the wheel" style={{ float: "left" }} id='spin' />
    </>
}
const Casino: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value)
    return (<>
        <h1>Casino</h1>  <br />
        get ready to gamble (${money}) <br />
        <SlotMachine />
        <RouletteWheel />
    </>)
}
export default Casino