import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

function App() {
  return (
    <main className="min-h-screen bg-white custom-container px-4 pt-24 pb-40">
      <div className="fixed w-full h-1 top-0 left-0 gradient" />
      <h1 className="font-sans font-bold text-gray-900 text-4xl mb-8">
        My financial app
      </h1>
      <div className="flex flex-col gap-4 mb-10">{/* <Form /> */}</div>
      <Table />
    </main>
  );
}

export default App;
