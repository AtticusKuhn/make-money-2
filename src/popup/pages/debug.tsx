import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { prestige, reset } from "../../redux/earn";
import { RootState } from "../../redux/store";

const Debug: React.FC<{}> = () => {
    const money = useSelector<RootState, number>((state) => state.money.value)
    // const [_c, sc] = useState<chromeStorage | null>(null)
    // //@ts-ignore
    // chrome.storage.sync.get("data", sc)
    const dispatch = useDispatch()

    return (<>
        <h1>Developer Debugger</h1>
        {/* redux state is:
        <br />
        <pre>{JSON.stringify(money, null, 4)}</pre>
        <br />
        Chrome state is
        <br />
        <pre>{JSON.stringify(c, null, 4)}</pre> */}
        <button onClick={() => dispatch(reset())}>reset all</button>
        <br />
        <br />
        <br />
        <button disabled={money < 1e6} onClick={() => dispatch(prestige())}>prestige</button>
    </>)
}
export default Debug;
