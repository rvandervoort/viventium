// below escapes an error that is not a risk in this case.
/* eslint-disable security/detect-object-injection */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "calculator",
})
export default class CalculatorPipe implements PipeTransform {
  // the below comment disables a warning regarding regex performance,
  // basically saying that if anyone inputs a huge document, the browser locks up.
  // to solve that, we'll ;imit the number of characters of the string to 5000.
  // That being said, performance is a real concern
  // eslint-disable-next-line security/detect-unsafe-regex
  equationParser =
    /(?<equation>-?\d+(?:\.\d+)?(?:\s?(?:-|\+)\s?-?\d+(?:\.\d+)?)+)/gi;

  // eslint-disable-next-line class-methods-use-this
  transform(value: string): string {
    if (value.length < 5000) {
      return value.replace(this.equationParser, CalculatorPipe.toValueElement);
    }
    return value;
  }

  public static toValueElement(equation: string): string {
    return `<b>${CalculatorPipe.toValue(equation)}</b>`;
  }

  public static toValue(equation: string): number {
    const chars = equation.replace(/\s/g, "").split("");

    let sum = 0;
    let operation = "+";
    let newOperation = "";
    let i = 0;

    while (i < chars.length) {
      const currentValue = [];
      // get characters until we hit an operation (- / +)
      while (chars[i] !== "+" && chars[i] !== "-" && i < chars.length) {
        currentValue.push(chars[i]);
        i += 1;
      }
      // store the new operation, perform the previous operation
      newOperation = chars[i];
      if (currentValue.length !== 0) {
        switch (operation) {
          case "+":
            sum += parseFloat(currentValue.join());
            break;
          case "-":
            sum += parseFloat(currentValue.join());
            break;
          default:
            throw new Error("not a supported equation");
        }
        operation = newOperation;
      } else {
        // case: leading "-" for negative numbers
        currentValue.push(chars[i]);
      }
      i += 1;
    }

    return sum;
  }
}
