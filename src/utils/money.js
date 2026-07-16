import { CURRENCY } from "src/constants";

export function money(n) {
  return `${Number(n).toFixed(2)} ${CURRENCY}`;
}
