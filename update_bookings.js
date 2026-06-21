const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated1 = await prisma.booking.updateMany({
    where: { organizer: "สมชาย ทดสอบ" },
    data: { organizer: "Regular User" }
  });
  
  const updated2 = await prisma.booking.updateMany({
    where: { organizer: "ศรีนวล ทดสอบ" },
    data: { organizer: "Regular User" }
  });

  const updated3 = await prisma.booking.updateMany({
    where: { organizer: "เสริมศรี ทดสอบ" },
    data: { organizer: "Regular User" }
  });

  console.log(`Updated bookings:`, { updated1, updated2, updated3 });
}

main().catch(console.error).finally(() => prisma.$disconnect());
