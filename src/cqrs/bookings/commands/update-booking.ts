import { db } from "../../../db";

export interface UpdateBookingCommand {
  id: string;
  roomId?: string;
  organizer?: string;
  title?: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
  participants?: number;
  status?: "confirmed" | "pending" | "cancelled";
}

export async function updateBooking(command: UpdateBookingCommand) {
  const existing = await db.booking.findUnique({
    where: { id: command.id },
  });
  if (!existing) {
    throw new Error("Booking not found");
  }

  const roomId = command.roomId ?? existing.roomId;
  const date = command.date ?? existing.date;
  const timeStart = command.timeStart ?? existing.timeStart;
  const timeEnd = command.timeEnd ?? existing.timeEnd;
  const status = command.status ?? existing.status;

  if (status.toLowerCase() !== "cancelled") {
    const otherBookings = await db.booking.findMany({
      where: {
        roomId,
        date,
        id: { not: command.id },
      },
    });

    for (const b of otherBookings) {
      if (b.status.toLowerCase() === "cancelled") continue;
      if (timeStart < b.timeEnd && timeEnd > b.timeStart) {
        throw new Error(`Time slot collision: Room is already booked by ${b.organizer} (${b.timeStart} - ${b.timeEnd})`);
      }
    }
  }

  const updateData: any = { ...command };
  delete updateData.id;
  if (updateData.participants !== undefined) {
    updateData.participants = Number(updateData.participants);
  }

  return await db.booking.update({
    where: { id: command.id },
    data: updateData,
  });
}
