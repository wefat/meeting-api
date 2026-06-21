import { db } from "../../../db";

export async function getBookingById(id: string) {
  const booking = await db.booking.findUnique({
    where: { id },
    include: {
      room: true
    }
  });

  if (!booking) return null;

  return {
    id: booking.id,
    roomId: booking.roomId,
    roomName: booking.room.name,
    room: {
      ...booking.room,
      amenities: JSON.parse(booking.room.amenities || "[]")
    },
    organizer: booking.organizer,
    title: booking.title,
    date: booking.date,
    timeStart: booking.timeStart,
    timeEnd: booking.timeEnd,
    participants: booking.participants,
    status: booking.status,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  };
}
