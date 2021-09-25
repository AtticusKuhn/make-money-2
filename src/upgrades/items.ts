import { storageUpgrade } from "../redux/earn";
import { upgradeType } from "../types";

const items: storageUpgrade[] = Object.entries({
    "Water Bottle": 10,
    "Backpack": 50,
    "Cart": 100,
    "Bicycle": 200,
    "Smartphone": 750,
    "Gaming Laptop": 2e3,
    "Plasma TV": 5e3,
    "Motorcycle": 15e3,
    "Car": 35e3,
    "Bitcoin": 42e3,
    "Luxury Car": 100e3,
    "Apartment": 300e3,
    "House": 1e6,
    "Mansion": 10e6,
    "Private Island": 14e6,
    "Rocket": 100e6,
    "Space Shuttle": 1e9,
    "Saturn V": 5e9,
    "Moon Landing": 25e9,
    "McDonald's": 100e9,
    "Apple": 1e12,
    "Fortune 500": 20e12,
    "United States": 200e12,
    "Everything on Earth": 1e15,
    "Earth": 100e15
}).map(([a, b]) => ({
    name: a,
    type: upgradeType.item,
    cost: b,
})).sort((a, b) => a.cost - b.cost)
export default items;