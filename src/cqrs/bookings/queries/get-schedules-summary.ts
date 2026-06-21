import { db } from "../../../db";

export async function getSchedulesSummary() {
  const bookings = await db.booking.findMany({
    include: {
      room: {
        select: { name: true }
      }
    },
    orderBy: { date: "asc" }
  });

  return bookings.map(b => {
    const start = `${b.date}T${b.timeStart}:00`;
    const end = `${b.date}T${b.timeEnd}:00`;

    return {
      id: b.id,
      title: `${b.room.name} - ${b.title || "จองห้องประชุม"} (${b.organizer})`,
      start,
      end,
      color: b.status === "confirmed" ? "#10B981" : b.status === "pending" ? "#F59E0B" : "#EF4444",
      extendedProps: {
        roomId: b.roomId,
        roomName: b.room.name,
        organizer: b.organizer,
        participants: b.participants,
        status: b.status
      }
    };
  });
}
