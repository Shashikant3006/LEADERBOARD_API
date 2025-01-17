import express from "express";
import { claimPoints, getAllUser, getMonthlyData, getTodayHistory, getUserHistory, getWeeklyData } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/get-users", getAllUser);
router.patch("/claim-points", claimPoints);
router.get("/your-daily-history", getTodayHistory);
router.get("/your-weekly-history", getWeeklyData);
router.get("/your-monthly-history", getMonthlyData);
router.get("/your-history", getUserHistory);

export default router;
