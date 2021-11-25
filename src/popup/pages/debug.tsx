import React, { useState } from "react";
import { prestige, reset, set } from "../../redux/earn";
import { useDisp, useSel } from "../../redux/store";

const Debug: React.FC<{}> = () => {
    const money = useSel((state) => state.money.value)
    const income = useSel((state) => state.money.income)
    // const [_c, sc] = useState<chromeStorage | null>(null)
    // //@ts-ignore
    // chrome.storage.sync.get("data", sc)
    const dispatch = useDisp()
    // let r = useRef<HTMLInputElement>(null)
    const [v, setV] = useState<number>(100)
    return (<>
        <h1>Developer Debugger</h1>
        <p>Do you want to experience the joy of Make Money again? If you reset, all your items
            will go away and you will go to the beginning of the story. If you prestige, you
            lose your items but your income increases.<b> Prestiging can be a good way to get
                past a rough spot where you are stuck.</b>
        </p>
        <p>If you prestiege your income increases by your the square root of your money times 0.0001</p>
        <br />
        <br />
        <br />
        <div className="btn-center"><button className="btn" style={{ backgroundColor: "red", }} onClick={() => dispatch(reset())}>reset all</button>
        </div>
        (lose everything and start from beginning)
        <br />
        <br />
        <br />
        <button disabled={money < 1e6} onClick={() => dispatch(prestige())}>prestige</button>
        (your income will be ${Math.floor(income + Math.sqrt(money) * 0.0001)} )
        <br />
        <br />
        <br />
        <input value={v} onChange={(e) => isNaN(Number(e.target.value)) || setV(Number(e.target.value))} />
        <button onClick={() => dispatch(set(Number(v)))}>set your money to ${v}</button>
    </>)
}
export default Debug;
