import { useState } from "react";
import { api } from "../api/api";

interface IForm {
  refetch: () => void;
}
interface IFormData {
  amount: number;
  category: string;
  description: string;
  is_income: boolean;
  date: string;
}

export const Form = ({ refetch }: IForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    amount: 0,
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await api.post("/transactions/", formData);
    if (res.status === 200) {
      refetch();
    }
    setIsLoading(false);
  };

  const currentYear = new Date().getFullYear();

  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;

  return (
    <form action="" className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm font-normal">
          Amount
        </label>
        <input
          name="amount"
          onChange={handleInputChange}
          type="number"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new amount..."
          value={formData.amount}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-normal">
          Category
        </label>
        <input
          name="category"
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new category..."
          value={formData.category}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-normal">
          Description
        </label>
        <input
          name="description"
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new description..."
          value={formData.description}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-normal">
          Date
        </label>
        <input
          name="date"
          onChange={handleInputChange}
          type="date"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new date..."
          value={formData.date}
          min={minDate}
          max={maxDate}
        />
      </div>
      <div className="flex items-center gap-2 mb-5">
        <label htmlFor="is_income" className="text-sm font-normal">
          Is Income?
        </label>
        <input name="is_income" type="checkbox" />
      </div>
      <button
        type="submit"
        className="bg-black py-1 p-2 text-sm w-fit text-white rounded-md disabled:bg-gray-300 disabled:cursor-none"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
};
