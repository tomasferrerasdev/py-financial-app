import "./App.css";

function App() {
  return (
    <main className="min-h-screen bg-white custom-container px-4 pt-24 pb-40">
      <div className="absolute w-full h-1 top-0 left-0 gradient" />
      <h1 className="font-sans font-bold text-gray-900 text-4xl mb-8">
        My financial app
      </h1>
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-normal">Amount</label>
          <input
            type="text"
            className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
            placeholder="Add new amount..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-normal">Category</label>
          <input
            type="text"
            className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
            placeholder="Add new category..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-normal">Description</label>
          <input
            type="text"
            className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
            placeholder="Add new description..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-normal">Date</label>
          <input
            type="text"
            className="bg-[#f0f2f6] rounded-lg h-10 p-2 text-sm"
            placeholder="Add new date..."
          />
        </div>

        <button className="bg-black py-1 p-2 text-sm w-fit text-white rounded-md">
          Submit
        </button>
      </div>

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
          <tr className="bg-[#f0f2f6]">
            <td className="p-2 border">1245</td>
            <td className="p-2 border">Learning</td>
            <td className="p-2 border">Course</td>
            <td className="p-2 border">no</td>
            <td className="p-2 border">2024-06-19</td>
          </tr>
          <tr className="">
            <td className="p-2 border">1245</td>
            <td className="p-2 border">Learning</td>
            <td className="p-2 border">Course</td>
            <td className="p-2 border">no</td>
            <td className="p-2 border">2024-06-19</td>
          </tr>
          <tr className="bg-[#f0f2f6]">
            <td className="p-2 border">1245</td>
            <td className="p-2 border">Learning</td>
            <td className="p-2 border">Course</td>
            <td className="p-2 border">no</td>
            <td className="p-2 border">2024-06-19</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default App;
