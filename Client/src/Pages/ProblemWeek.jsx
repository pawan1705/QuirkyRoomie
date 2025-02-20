import { useState, useEffect } from "react";
import axios from "axios";
const ProblemWeek = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`http://localhost:3020/api/user/most-voted-complaint`)
      .then((res) => setData(res.data));
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, [data]);
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-6 rounded-lg flex justify-center shadow-lg w-full sm:w-220 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold  text-center mb-8">
          PROBLEM OF THE WEEK
        </h2>
        <form>
          <table className="text-red-500   " cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th className="border border-red-500 ">Title</th>
                <th className="border border-red-500 ">Email</th>
                <th className="border border-red-500 ">Description</th>
                <th className="border border-red-500 ">Complaint Type</th>
                <th className="border border-red-500 ">Severity Level</th>
                <th className="border border-red-500 ">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="text-emerald-400   ">
                  <td className="border border-red-500 ">{item.title}</td>
                  <td className="border border-red-500 ">{item.email}</td>
                  <td className="border border-red-500 ">{item.description}</td>
                  <td className="border border-red-500 ">
                    {item.complaintType}
                  </td>
                  <td className="border border-red-500 ">
                    {item.severityLevel}
                  </td>
                  <td className="border border-red-500 ">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ProblemWeek;
