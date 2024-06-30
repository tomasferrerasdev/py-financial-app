import { useEffect, useState } from "react";
import { api } from "../api/api";

type Transaction = {
  amount: number;
  category: string;
  description: string;
  is_income: boolean;
  date: string;
  id: number;
};

export const Table = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const res = await api.get("/transactions/");
    if (res.status === 200) {
      setTransactions(res.data);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <table className="table-fixed w-full text-left text-base rounded-lg">
      <thead>
        <tr>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Income/Outcome</th>
          <th className="p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(
          ({ amount, category, description, is_income, date }, index) => (
            <tr className={`${index % 2 === 0 ? `bg-[#f0f2f6]` : `bg-white`}`}>
              <td className="p-2 border">{formatAmount(amount)}</td>
              <td className="p-2 border">{category}</td>
              <td className="p-2 border">{description}</td>
              <td className="p-2 border">{is_income ? "income" : "outcome"}</td>
              <td className="p-2 border">{date}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
