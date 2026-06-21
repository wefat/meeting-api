import { db } from "../../../db";

export interface UpdateRoomCommand {
  id: string;
  name?: string;
  floor?: number;
  capacity?: number;
  type?: string;
  description?: string;
  amenities?: string[];
  status?: "available" | "maintenance" | "inactive";
  image?: string;
}

export async function updateRoom(command: UpdateRoomCommand) {
  const { id, ...data } = command;
  const updateData: any = { ...data };
  if (data.floor !== undefined) updateData.floor = Number(data.floor);
  if (data.capacity !== undefined) updateData.capacity = Number(data.capacity);
  if (data.amenities !== undefined) updateData.amenities = JSON.stringify(data.amenities);

  return await db.room.update({
    where: { id },
    data: updateData,
  });
}
