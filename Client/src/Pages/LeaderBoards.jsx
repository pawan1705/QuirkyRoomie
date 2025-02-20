import React, { useEffect, useState } from "react";
import axios from "axios";
const LeaderBoards = () => {
  const [complaintFile, setComplaintFile] = useState([]);
  const [topComplaintType, setTopComplaintType] = useState([]);

  const getPersonFileComplaint = () => {
    axios
      .get(`http://localhost:3020/api/user/most-complaint-person`)
      .then((res) => setComplaintFile(res.data));
  };
  const getTopComplaintType = () => {
    axios
      .get(`http://localhost:3020/api/user/most-frequent-complaint-type`)
      .then((res) => setTopComplaintType(res.data));
    console.log(topComplaintType);
  };
  useEffect(() => {
    getPersonFileComplaint();
    getTopComplaintType();
  }, []);
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-6 rounded-lg flex justify-center shadow-lg w-full sm:w-220 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold  text-center mb-8">
          LEADERBOARD & STATS
        </h2>
        <form>
          <table
            className="text-yellow-500   "
            cellPadding="10"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th className="border border-white-500 ">
                  Most Complaints Filed
                </th>
                <th className="border border-white-500 ">
                  Top Complaint Category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-emerald-400  text-2xl ">
                <td className="border border-white-500 ">
                  <ul>
                    {complaintFile.map((item) => (
                      <li key={item._id}>
                        <strong>ID-</strong> {item._id} <br />
                        <strong>No.-</strong> {item.count}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-white-500 text-2xl ">
                  <ul>
                    {topComplaintType.map((item) => (
                      <li key={item._id}>
                        {item._id} <br />
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default LeaderBoards;
