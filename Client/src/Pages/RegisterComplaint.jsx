import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterComplaint = () => {
  // const { backendUrl } = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  //   state management start
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [description, setDescription] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [severityLevel, setSeverityLevel] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !complaintType || !severityLevel) {
      toast.error("Please fill all required fields");
      return;
    }
    const RegisterData = {
      title: title,
      description: description,
      email: email,
      complaintType: complaintType,
      severityLevel: severityLevel,
    };
    try {
      await axios.post(
        `http://localhost:3020/api/user/register-complaint`,
        RegisterData
      );
      toast.success("Complaint registered successfully!");
      navigate("/all-complaint");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // state management end
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full sm:w-128 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          Register Complaint
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Title */}
          <div className="mb-[10px] text-white">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-[10px] text-white">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-[10px] text-white">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-[100px] p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Complaint Type */}
          <div className="mb-[10px] text-white">
            <label>Complaint Type:</label>
            <select
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded "
            >
              <option className="bg-gray-400" value="Noise">
                Noise
              </option>
              <option className="bg-gray-400" value="Cleanliness">
                Cleanliness
              </option>
              <option className="bg-gray-400" value="Bills">
                Bills
              </option>
              <option className="bg-gray-400" value="Pets">
                Pets
              </option>
              <option className="bg-gray-400" value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Severity Level */}
          <div className="mb-[10px] text-white">
            <label>Severity Level:</label>
            <select
              value={severityLevel}
              onChange={(e) => setSeverityLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Mild" className="bg-gray-400">
                Mild
              </option>
              <option className="bg-gray-400" value="Annoying">
                Annoying
              </option>
              <option className="bg-gray-400" value="Major">
                Major
              </option>
              <option className="bg-gray-400" value="Nuclear">
                Nuclear
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-2.5 rounded border-0 bg-blue-500 text-white cursor-pointer"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
