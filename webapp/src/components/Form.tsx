import { useState } from "react";
import { api } from "../api/api";

export const Form = () => {
  const [formData, setFormData] = useState({
    amount: "",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api.post("/transactions/", formData);
  };

  return (
    <form action="" className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">Amount</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new amount..."
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">Category</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new category..."
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">Description</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new description..."
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">Date</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
          placeholder="Add new date..."
        />
      </div>
      <button className="bg-black py-1 p-2 text-sm w-fit text-white rounded-md">
        Submit
      </button>
    </form>
  );
};
