import { Router } from "express";
import { getRooms } from "../cqrs/rooms/queries/get-rooms";
import { getRoomById } from "../cqrs/rooms/queries/get-room";
import { createRoom } from "../cqrs/rooms/commands/create-room";
import { updateRoom } from "../cqrs/rooms/commands/update-room";
import { deleteRoom } from "../cqrs/rooms/commands/delete-room";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { type, status } = req.query;
    const rooms = await getRooms({
      type: type as string,
      status: status as string,
    });
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await getRoomById(req.params.id);
    if (!room) {
      res.status(404).json({ error: "Room not found" });
      return;
    }
    res.json(room);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRoom = await createRoom(req.body);
    res.status(201).json(newRoom);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await updateRoom({ id: req.params.id, ...req.body });
    res.json(updatedRoom);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteRoom(req.params.id);
    res.json({ message: "Room deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
