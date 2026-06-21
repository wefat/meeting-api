import { db } from "../../../db";

export interface CreateRoomCommand {
  name: string;
  floor: number;
  capacity: number;
  type: string;
  description?: string;
  amenities: string[];
  status: "available" | "maintenance" | "inactive";
  image?: string;
}

export async function createRoom(command: CreateRoomCommand) {
  return await db.room.create({
    data: {
      name: command.name,
      floor: Number(command.floor),
      capacity: Number(command.capacity),
      type: command.type,
      description: command.description || "",
      amenities: JSON.stringify(command.amenities),
      status: command.status,
      image: command.image || "",
    },
  });
}
