import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { chromeStorage } from "../../types";

const Debug: React.FC<{}> = () => {
    const money = useSelector<RootState>((state) => state)
    const [c, sc] = useState<chromeStorage | null>(null)
    //@ts-ignore
    chrome.storage.sync.get("data", sc)
    return (<>
        redux state is:
        <br />
        <pre>{JSON.stringify(money, null, 4)}</pre>
        <br />
        Chrome state is
        <br />
        <pre>{JSON.stringify(c, null, 4)}</pre>
    </>)
}
export default Debug;