import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import roomRoutes from "./routes/room.routes";
import bookingRoutes from "./routes/booking.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import lineRoutes from "./routes/line";
import { swaggerDocument } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/admin/rooms", roomRoutes);
app.use("/api/admin/bookings", bookingRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/line", lineRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
