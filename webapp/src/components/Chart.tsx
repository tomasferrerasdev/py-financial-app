import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Transaction } from "../App";
import { sumAmountsByMonth } from "../utils/sumAmountsByMonth";
import { monthNames, monthOrder } from "../constants/months";
import { formatCurrency } from "../utils/currencyFormatter";

interface IChart {
  transactions: Transaction[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}

export const Chart = ({ transactions }: IChart) => {
  const groupedData = sumAmountsByMonth(transactions);
  const sortedData = groupedData.sort(
    (a, b) => monthOrder[a.date] - monthOrder[b.date]
  );
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#f0f2f6] py-2 px-4 rounded-lg text-sm">
          <p>{monthNames[label ? label : ""]}</p>
          <p>
            <b>Total amount:</b> {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full">
      <h2 className="font-sans font-bold text-gray-900 text-2xl mb-2">
        Spend chart
      </h2>
      <div className="w-full h-[300px] relative">
        <ResponsiveContainer>
          <LineChart width={500} height={300} data={sortedData}>
            <CartesianGrid strokeDasharray="2 2" />
            {transactions.length > 0 && (
              <>
                <XAxis dataKey="date" interval="preserveStartEnd" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="url(#colorPv)"
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(131, 58, 180, 1)" />
                    <stop offset="50%" stopColor="rgba(253, 29, 29, 1)" />
                    <stop offset="100%" stopColor="rgba(252, 176, 69, 1)" />
                  </linearGradient>
                </defs>
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        {transactions.length === 0 && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};
