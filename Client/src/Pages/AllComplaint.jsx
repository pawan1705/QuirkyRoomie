import { useEffect, useState } from "react";
import axios from "axios";
const AllComplaint = () => {
  const [data, setData] = useState([]);
  const [upvote, setUpVote] = useState(0);

  const getData = () => {
    axios
      .get("http://localhost:3020/api/user/get-all-complaint")
      .then((res) => setData(res.data));
    console.log(data);
  };
  const handleDownvote = (id) => {
    axios
      .post(`http://localhost:3020/api/user/downvote/${id}`)
      .then(() => getData());
  };

  const handleUpvote = (id) => {
    axios
      .post(`http://localhost:3020/api/user/upvote/${id}`)
      .then(() => getData());
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-250 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          All Complaint
        </h2>
        <form>
          <table className="text-white  " cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th className="border border-teal-500 ">Title</th>
                <th className="border border-teal-500 ">Email</th>
                <th className="border border-teal-500 ">Description</th>
                <th className="border border-teal-500 ">Complaint Type</th>
                <th className="border border-teal-500 ">Severity Level</th>
                <th className="border border-teal-500 ">Timestamp</th>
                <th className="border border-teal-500 text-green-500 ">
                  Upvote
                </th>
                <th className="border border-teal-500 ">Vote</th>
                <th className="border border-teal-500 text-red-400 ">
                  Downvote
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="border border-teal-500 ">{item.title}</td>
                  <td className="border border-teal-500 ">{item.email}</td>
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
                    <p
                      onClick={() => handleUpvote(item._id)}
                      className="cursor-pointer w-full py-1  mr-2 rounded-full bg-gradient-to-r from-green-500 to-green-900  text-white font-medium"
                    >
                      Upvotes
                    </p>
                  </td>
                  <td className="border border-teal-500 ">{item.vote}</td>
                  <td className="border border-teal-500 ">
                    <p
                      onClick={() => handleDownvote(item._id)}
                      className=" cursor-pointer w-full py-1 mr-2 rounded-full bg-gradient-to-r from-red-500 to-red-900  text-white font-medium"
                    >
                      Downvotes
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

export default AllComplaint;
