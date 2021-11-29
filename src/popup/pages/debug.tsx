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
    return (<div className="btn-center">
        <h1 className="centered">Prestiege</h1>
        <p>Do you want to experience the joy of Make Money again? If you reset, all your items
            will go away and you will go to the beginning of the story. If you prestige, you
            lose your items but your income increases.<b> Prestiging can be a good way to get
                past a rough spot where you are stuck.</b>
        </p>
        <p>If you prestiege your income increases by your the square root of your money times 0.0001</p>
        <br />
        <br />
        <br />
        <div className="btn-center"><button id="reset" className="btn" onClick={() => dispatch(reset())}>Reset All</button>
        </div>
        <style>{`#reset:hover:not(:disabled){ background-color:red !important;}`}</style>
        (lose everything and start from beginning)
        <br />
        <br />
        <br />
        <div className="btn-center">
            <button className="btn" id="prestiege" disabled={money < 1e6} onClick={() => dispatch(prestige())}>Prestige</button>
        </div>
        <style>{`#prestiege:hover:not(:disabled){ background-color:red !important;;}`}</style>

        (your income will be ${Math.floor(income + Math.sqrt(money) * 0.0001)} )
        <br />
        <br />
        <br />
        {process.env.NODE_ENV === "development" && <>
            <p>Because this is being run in developer mode, you can set your money to whatever value you like, but this ability is not in production mode</p>
            <input value={v} onChange={(e) => isNaN(Number(e.target.value)) || setV(Number(e.target.value))} />
            <br /> <br />
            <div className="btn-center">
                <button className="btn" onClick={() => dispatch(set(Number(v)))}>Set your money to ${v}</button>
            </div>
        </>}


    </div>)
}
export default Debug;
