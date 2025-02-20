import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      enum: ["Noise", "Cleanliness", "Bills", "Pets", "Other"],
      required: true,
    },
    severityLevel: {
      type: String,
      enum: ["Mild", "Annoying", "Major", "Nuclear"],
      required: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Resolved", "Not-Resolved"],
      default: "Not-Resolved",
    },
  },
  { timestamps: true }
);

const complaintModel = mongoose.model("Complaint", complaintSchema);

export default complaintModel;
