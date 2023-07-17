type Mode = "add" | "subtract" | "multiply" | "divide";

export class Calculator {
  private a: number;
  private b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  calculate(mode: Mode): number {
    switch (mode) {
      case "add":
        return this.add();
      case "subtract":
        return this.subtract();
      case "multiply":
        return this.multiply();
      case "divide":
        return this.divide();
      default:
        throw new Error("Invalid mode");
    }
  }

  private add(): number {
    return this.a + this.b;
  }

  private subtract(): number {
    return this.a - this.b;
  }

  private multiply(): number {
    return this.a * this.b;
  }

  private divide(): number {
    return this.a / this.b;
  }
}
