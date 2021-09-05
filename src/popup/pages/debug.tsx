import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Debug: React.FC<{}> = () => {
    const money = useSelector<RootState>((state) => state)

    return (<>
        <pre>{JSON.stringify(money, null, 4)}</pre>
    </>)
}
export default Debug;