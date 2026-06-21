import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Normalizing booking statuses to lowercase...");
  const bookings = await prisma.booking.findMany();
  let updatedCount = 0;
  for (const b of bookings) {
    const lowerStatus = b.status.toLowerCase();
    if (b.status !== lowerStatus) {
      await prisma.booking.update({
        where: { id: b.id },
        data: { status: lowerStatus }
      });
      console.log(`Updated booking ${b.id} status: ${b.status} -> ${lowerStatus}`);
      updatedCount++;
    }
  }
  console.log(`Finished normalizing database. Updated ${updatedCount} bookings.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
