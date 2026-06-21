import { db } from "../../../db";

export async function getBookings(filters?: { status?: string; search?: string; roomId?: string; date?: string }) {
  const where: any = {};
  
  if (filters?.status && filters.status !== "all") {
    where.status = filters.status;
  }

  if (filters?.roomId) {
    where.roomId = filters.roomId;
  }

  if (filters?.date) {
    where.date = filters.date;
  }

  if (filters?.search) {
    where.OR = [
      { organizer: { contains: filters.search } },
      { title: { contains: filters.search } },
      { room: { name: { contains: filters.search } } }
    ];
  }

  const bookings = await db.booking.findMany({
    where,
    include: {
      room: {
        select: { name: true }
      }
    },
    orderBy: [
      { date: "desc" },
      { timeStart: "desc" }
    ]
  });

  return bookings.map(b => ({
    id: b.id,
    roomId: b.roomId,
    roomName: b.room.name,
    organizer: b.organizer,
    title: b.title,
    date: b.date,
    timeStart: b.timeStart,
    timeEnd: b.timeEnd,
    participants: b.participants,
    status: b.status,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  }));
}
