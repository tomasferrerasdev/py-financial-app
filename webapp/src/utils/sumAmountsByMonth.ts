import { Transaction } from "../App";

export const sumAmountsByMonth = (transactions: Transaction[]) => {
  const sumsByMonth: { [key: string]: number } = {};

  transactions.forEach(({ date, amount }) => {
    const yearMonth = date.slice(0, 7);
    if (!sumsByMonth[yearMonth]) {
      sumsByMonth[yearMonth] = 0;
    }
    sumsByMonth[yearMonth] += amount;
  });

  return Object.entries(sumsByMonth).map(([date, totalAmount]) => {
    const monthDate = new Date(`${date}-01`);
    const monthName = monthDate.toLocaleString("default", { month: "short" });
    return {
      date: monthName,
      totalAmount,
    };
  });
};
