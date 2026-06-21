import { db } from "../../../db";

export async function deleteBooking(id: string) {
  return await db.booking.delete({
    where: { id },
  });
}
