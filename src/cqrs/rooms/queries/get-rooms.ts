import { db } from "../../../db";

export async function getRooms(filters?: { type?: string; status?: string }) {
  const where: any = {};
  if (filters?.type && filters.type !== "all") {
    where.type = filters.type;
  }
  if (filters?.status && filters.status !== "all") {
    where.status = filters.status;
  }

  const rooms = await db.room.findMany({
    where,
    include: {
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return rooms.map(room => ({
    ...room,
    amenities: JSON.parse(room.amenities || "[]"),
    bookings: room._count.bookings
  }));
}
