import { db } from "../../../db";

export async function getRoomById(id: string) {
  const room = await db.room.findUnique({
    where: { id },
  });

  if (!room) return null;

  return {
    ...room,
    amenities: JSON.parse(room.amenities || "[]"),
  };
}
