import { Transaction } from "../App";
import { formatCurrency } from "../utils/currencyFormatter";

interface ITable {
  transactions: Transaction[];
}

export const Table = ({ transactions }: ITable) => {
  return (
    <table className="table-fixed w-full text-left text-base rounded-lg">
      <thead>
        <tr>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Is income?</th>
          <th className="p-2 border">Date</th>
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
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
