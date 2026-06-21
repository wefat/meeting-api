import { Router } from "express";
import { getBookings } from "../cqrs/bookings/queries/get-bookings";
import { getBookingById } from "../cqrs/bookings/queries/get-booking";
import { getSchedulesSummary } from "../cqrs/bookings/queries/get-schedules-summary";
import { createBooking } from "../cqrs/bookings/commands/create-booking";
import { updateBooking } from "../cqrs/bookings/commands/update-booking";
import { deleteBooking } from "../cqrs/bookings/commands/delete-booking";

const router = Router();

router.get("/summary", async (req, res) => {
  try {
    const summary = await getSchedulesSummary();
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, search, roomId, date } = req.query;
    const bookings = await getBookings({
      status: status as string,
      search: search as string,
      roomId: roomId as string,
      date: date as string,
    });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await updateBooking({ id: req.params.id, ...req.body });
    res.json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteBooking(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
