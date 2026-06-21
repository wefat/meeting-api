import { db } from "../../../db";

export async function deleteRoom(id: string) {
  return await db.room.delete({
    where: { id },
  });
}
