export function numberToCurrency(num: number) {
  if (num === 0) return "$0.00";
  return `$\${num.toFixed(2)}`;
}
