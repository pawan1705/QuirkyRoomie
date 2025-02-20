import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
const MyComplaint = () => {
  const { userData } = useContext(AppContext);
  const email = userData.email;
  const [data, setData] = useState([]);

  const handleToggle = (id) => {
    axios
      .put(`http://localhost:3020/api/user/toggle-status/${id}`)
      .then(() => getData());
  };
  const getData = () => {
    axios
      .get(`http://localhost:3020/api/user/get-user-complaint/${email}`)
      .then((res) => setData(res.data));
    console.log(data);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3020/api/user/drop-complaint/${id}`)
      .then(() => getData());
  };
  useEffect(() => {
    getData();
  }, [data]);
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-200 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          My Complaint
        </h2>
        <form>
          <table className="text-white  " cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th className="border border-teal-500 ">Title</th>
                <th className="border border-teal-500 ">Description</th>
                <th className="border border-teal-500 ">Complaint Type</th>
                <th className="border border-teal-500 ">Severity Level</th>
                <th className="border border-teal-500 ">Timestamp</th>
                <th className="border border-teal-500 text-green-500 ">
                  Status
                </th>

                <th className="border border-teal-500 text-red-400 ">Drop</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="border border-teal-500 ">{item.title}</td>
                  <td className="border border-teal-500 ">
                    {item.description}
                  </td>
                  <td className="border border-teal-500 ">
                    {item.complaintType}
                  </td>
                  <td className="border border-teal-500 ">
                    {item.severityLevel}
                  </td>
                  <td className="border border-teal-500 ">{item.createdAt}</td>
                  <td className="border border-teal-500 ">
                    {item.status == "Not-Resolved" && (
                      <p
                        onClick={() => handleToggle(item._id)}
                        className=" cursor-pointer w-full py-1  mr-2 rounded-full  bg-red-700   text-white font-medium"
                      >
                        Not Resolved
                      </p>
                    )}
                    {item.status == "Resolved" && (
                      <p
                        onClick={() => handleToggle(item._id)}
                        className=" cursor-pointer w-full py-1  mr-2 rounded-full  bg-green-600   text-white font-medium"
                      >
                        Resolved
                      </p>
                    )}
                  </td>
                  <td className="border border-teal-500 ">
                    <p
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer w-full py-1 mr-2 rounded-full bg-gradient-to-r from-red-500 to-red-900  text-white font-medium"
                    >
                      Drop
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default MyComplaint;
