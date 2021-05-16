export default function compareByNumber(a: string, b: string) {
  let firstNumber = parseFloat(a);
  let secondNumber = parseFloat(b);

  if (firstNumber < secondNumber) {
    return -1;
  }
  if (firstNumber > secondNumber) {
    return 1;
  }

  // firstNumber must be equal to secondNumber
  return 0;
}
