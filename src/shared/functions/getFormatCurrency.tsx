const getFormatCurrency = (value: any, decimalAmount: number = 2) => {
  let number: number = parseFloat(value);

  if (!value) {
    return getDecimal(0, decimalAmount);
  }
  return getDecimal(number, decimalAmount);
};

const getDecimal = (number: any, decimalAmount: number = 2) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimalAmount,
    maximumFractionDigits: decimalAmount,
  });
};

export default getFormatCurrency;
