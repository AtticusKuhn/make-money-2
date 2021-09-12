import { upgrades } from "./buttons"
import u from "./upgrades"
export default {
    buttons: upgrades,
    upgrades: u,
    all: [...upgrades, ...u]
}