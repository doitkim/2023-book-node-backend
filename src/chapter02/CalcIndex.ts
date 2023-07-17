import { Calculator } from "../util/calculator";
const a: number = 17;
const b: number = 3;

const calculator = new Calculator(a, b);

console.log(`Add Result : ${calculator.calculate("add")}`);
console.log(`Subtract Result : ${calculator.calculate("subtract")}`);
console.log(`Multiply Result : ${calculator.calculate("multiply")}`);
console.log(`Divide Result : ${calculator.calculate("divide")}`);
