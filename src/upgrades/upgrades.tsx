import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Equippable } from "./buttons";

export const milestone = new Equippable("money milestone", 10)
export const MilestoneComponent: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value);
    const stones = [
        { v: 0, n: "you very poor" },
        { v: 1, n: "you are poor" },
        { v: 10, n: "you have the wealth of a 10 year old" },
        { v: 1000, n: " you are rich" },
    ].reverse();
    const msg = stones.find(x => money > x.v)?.n || "you are so rich you caused a bug in the fabric of the universe";
    return <div> milestone: {msg} </div>;
}
export default [milestone]