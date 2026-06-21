const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.room.findMany().then(rooms => {
  console.log(rooms.map(r => ({
    id: r.id,
    name: r.name,
    type: r.type,
    image: r.image ? r.image.substring(0, 50) + '...' : null,
    amenities: r.amenities
  })));
}).catch(console.error).finally(() => prisma.$disconnect());
