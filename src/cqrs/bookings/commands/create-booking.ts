import { db } from "../../../db";

export interface CreateBookingCommand {
  roomId: string;
  organizer: string;
  title?: string;
  date: string; // "YYYY-MM-DD"
  timeStart: string; // "HH:MM"
  timeEnd: string; // "HH:MM"
  participants: number;
  status: "confirmed" | "pending" | "cancelled";
}

export async function createBooking(command: CreateBookingCommand) {
  const room = await db.room.findUnique({
    where: { id: command.roomId },
  });
  if (!room) {
    throw new Error("Room not found");
  }

  if (command.status.toLowerCase() !== "cancelled") {
    const existingBookings = await db.booking.findMany({
      where: {
        roomId: command.roomId,
        date: command.date,
      },
    });

    for (const b of existingBookings) {
      if (b.status.toLowerCase() === "cancelled") continue;
      if (command.timeStart < b.timeEnd && command.timeEnd > b.timeStart) {
        throw new Error(`Time slot collision: Room is already booked by ${b.organizer} (${b.timeStart} - ${b.timeEnd})`);
      }
    }
  }

  return await db.booking.create({
    data: {
      roomId: command.roomId,
      organizer: command.organizer,
      title: command.title || "",
      date: command.date,
      timeStart: command.timeStart,
      timeEnd: command.timeEnd,
      participants: Number(command.participants),
      status: command.status,
    },
  });
}
