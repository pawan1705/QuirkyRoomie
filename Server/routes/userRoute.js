import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  getUserData,
  registerComplaint,
  getAllComplaints,
  getUserComplaints,
  dropComplaint,
  upVote,
  downVote,
  fetchVote,
  mostVotedComplaint,
  toggleStatus,
  mostFrequentComplaintType,
  mostComplaintPerson,
} from "../controller/userController.js";
const userRouter = express.Router();
userRouter.get("/data", userAuth, getUserData);
userRouter.post("/register-complaint", userAuth, registerComplaint);
userRouter.get("/get-all-complaint", getAllComplaints);
userRouter.get("/get-user-complaint/:email", userAuth, getUserComplaints);
userRouter.delete("/drop-complaint/:id", userAuth, dropComplaint);
userRouter.get("/fetch-vote/:id", fetchVote);
userRouter.post("/upvote/:id", userAuth, upVote);
userRouter.post("/downvote/:id", userAuth, downVote);
userRouter.get("/most-voted-complaint", mostVotedComplaint);
userRouter.put("/toggle-status/:id", userAuth, toggleStatus);
userRouter.get("/most-frequent-complaint-type", mostFrequentComplaintType);
userRouter.get("/most-complaint-person", mostComplaintPerson);
export default userRouter;
