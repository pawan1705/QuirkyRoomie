import complaintModel from "../models/complaintModel.js";
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// api for register complaint
export const registerComplaint = async (req, res) => {
  try {
    const { title, description, email, complaintType, severityLevel } =
      req.body;
    if (!title || !description || !email || !complaintType || !severityLevel) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }
    await new complaintModel({
      title,
      description,
      email,
      complaintType,
      severityLevel,
    }).save();
    res.status(201).json({
      success: true,
      message: "Complaint Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api for all complaint
export const getAllComplaints = async (req, res) => {
  try {
    const complains = await complaintModel.find();
    console.log(complains);
    res.status(201).json(complains);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api for get all complaints by user
export const getUserComplaints = async (req, res) => {
  try {
    const email = req.params.email;
    const complaints = await complaintModel.find({ email: email });

    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaints found for this email",
      });
    }

    res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api for drop complaint
export const dropComplaint = async (req, res) => {
  try {
    const complaint = await complaintModel.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).send({ message: "complaint not found" });
    }
    res.send({ message: "complaint deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// api for upvote
export const upVote = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the complaint by ID
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Increase the vote count by 1
    complaint.vote += 1;
    await complaint.save();

    res.status(200).json({
      message: "Vote increased successfully",
      complaint,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err });
  }
};

// api for down vote
export const downVote = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the complaint by ID
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Decrease the vote count by 1
    if (complaint.vote > 0) {
      complaint.vote -= 1;
    }
    await complaint.save();

    res.status(200).json({
      message: "Vote decrease successfully",
      complaint,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err });
  }
};

// fetch vote
export const fetchVote = async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Find the complaint by ID
    const complaint = await complaintModel.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Return the vote value
    res.status(200).json({ vote: complaint.vote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//most voted complaint
export const mostVotedComplaint = async (req, res) => {
  try {
    // Use MongoDB aggregation to sort by vote in descending order and limit to 1 result
    const mostVotedComplaint = await complaintModel
      .find()
      .sort({ vote: -1 }) // Sort by vote in descending order
      .limit(1); // Limit to 1 result

    if (!mostVotedComplaint || mostVotedComplaint.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    // Return the most voted complaint
    res.status(200).json(mostVotedComplaint);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// api for change status by user
export const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the complaint by ID
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Toggle the status
    complaint.status =
      complaint.status === "Resolved" ? "Not-Resolved" : "Resolved";

    // Save the updated complaint
    await complaint.save();

    // Return the updated complaint
    res.status(200).json({
      message: "Status toggled successfully",
      complaint,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

//api for most frequent complaint type
export const mostFrequentComplaintType = async (req, res) => {
  try {
    // Use MongoDB aggregation to group by complaintType and count occurrences
    const result = await complaintModel.aggregate([
      {
        $group: {
          _id: "$complaintType", // Group by complaintType
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $sort: { count: -1 }, // Sort by count in descending order
      },
      {
        $limit: 1, // Limit to the top result
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    // Return the most frequent complaint type
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// person who has the most complaint
export const mostComplaintPerson = async (req, res) => {
  try {
    const mostUsedEmail = await complaintModel.aggregate([
      { $group: { _id: "$email", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (mostUsedEmail.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.json(mostUsedEmail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
