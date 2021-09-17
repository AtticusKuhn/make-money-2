import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/earn";

const Debug: React.FC<{}> = () => {
    // const money = useSelector<RootState>((state) => state)
    // const [c, sc] = useState<chromeStorage | null>(null)
    //@ts-ignore
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
    </>)
}
export default Debug;
