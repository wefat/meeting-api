import { Router } from "express";
import { getDashboardStats } from "../cqrs/bookings/queries/get-dashboard-stats";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
