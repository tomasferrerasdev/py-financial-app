import { useState } from "react";
import { Transaction } from "../App";
import { formatCurrency } from "../utils/currencyFormatter";
import { api } from "../api/api";

interface ITable {
  transactions: Transaction[];
  refetch: () => void;
}

export const Table = ({ transactions, refetch }: ITable) => {
  const [checkedTransactionIds, setCheckedTransactionIds] = useState<string[]>(
    []
  );

  const handleCheckboxChange = (id: string) => {
    setCheckedTransactionIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const deleteTransactions = async () => {
    try {
      await api.delete("/transactions/", {
        data: {
          transaction_ids: checkedTransactionIds,
        },
      });
      refetch();
      setCheckedTransactionIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table className="table-fixed w-full text-left text-base rounded-lg mb-2">
        <thead>
          <tr>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Is income?</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border w-8"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ amount, category, description, is_income, date, id }, index) => (
              <tr
                className={`${index % 2 === 0 ? `bg-[#f0f2f6]` : `bg-white`}`}
                key={id}
              >
                <td className="p-2 border">{formatCurrency(amount)}</td>
                <td className="p-2 border">{category}</td>
                <td className="p-2 border">{description}</td>
                <td className="p-2 border">{is_income ? "No" : "Yes"}</td>
                <td className="p-2 border">{date}</td>
                <td className="p-2 border w-8">
                  <input
                    type="checkbox"
                    checked={checkedTransactionIds.includes(`${id}`)}
                    onChange={() => handleCheckboxChange(`${id}`)}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="h-7 flex items-center justify-end">
        {checkedTransactionIds.length > 0 && (
          <button
            onClick={deleteTransactions}
            className="bg-black py-1 p-2 text-sm w-fit text-white rounded-md disabled:bg-gray-300 disabled:cursor-none"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
