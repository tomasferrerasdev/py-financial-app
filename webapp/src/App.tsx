import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { api } from "./api/api";
import { Chart } from "./components/Chart";

export type Transaction = {
  amount: number;
  category: string;
  description: string;
  is_income: boolean;
  date: string;
  id: number;
};

function App() {
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

  return (
    <main className="min-h-screen bg-white custom-container px-4 pt-24 pb-40">
      <div className="fixed w-full h-1 top-0 left-0 gradient" />
      <h1 className="font-sans font-bold text-gray-900 text-4xl mb-8">
        My anual financial app
      </h1>
      <div className="flex flex-col gap-8">
        <Form refetch={fetchTransactions} />
        <Table transactions={transactions} refetch={fetchTransactions} />
        <Chart transactions={transactions} />
      </div>
    </main>
  );
}

export default App;
