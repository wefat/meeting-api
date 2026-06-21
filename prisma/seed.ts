import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();

  const room1 = await prisma.room.create({
    data: {
      name: "Andaman Suite",
      floor: 12,
      capacity: 50,
      type: "ห้องประชุมใหญ่",
      description: "ห้องประชุมขนาดใหญ่พร้อมเครื่องอำนวยความสะดวกครบครัน เหมาะสำหรับการประชุมสัมมนาและนำเสนอผลงาน",
      amenities: JSON.stringify(["WiFi", "Projector", "AC", "Sound System"]),
      status: "available",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=340&fit=crop",
    },
  });

  const room2 = await prisma.room.create({
    data: {
      name: "Similan Room",
      floor: 12,
      capacity: 12,
      type: "ห้องประชุมย่อย",
      description: "ห้องประชุมย่อยส่วนตัว เหมาะสำหรับการประชุมกลุ่มย่อยหรือระดมสมอง",
      amenities: JSON.stringify(["WiFi", "TV", "AC"]),
      status: "available",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=340&fit=crop",
    },
  });

  const room3 = await prisma.room.create({
    data: {
      name: "Lanna Hub",
      floor: 10,
      capacity: 30,
      type: "Creative Space",
      description: "พื้นที่สร้างสรรค์สำหรับทำงานร่วมกันและจัดกิจกรรมขนาดกลาง",
      amenities: JSON.stringify(["WiFi", "Whiteboard", "AC", "Coffee Station"]),
      status: "available",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=340&fit=crop",
    },
  });

  const room4 = await prisma.room.create({
    data: {
      name: "Chao Phraya Boardroom",
      floor: 9,
      capacity: 20,
      type: "Executive Boardroom",
      description: "ห้องบอร์ดรูมระดับผู้บริหาร ตกแต่งหรูหรา",
      amenities: JSON.stringify(["WiFi", "Projector", "AC", "Coffee Station", "Video Conference"]),
      status: "maintenance",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=340&fit=crop",
    },
  });

  const room5 = await prisma.room.create({
    data: {
      name: "Phuket Lab",
      floor: 8,
      capacity: 40,
      type: "Training Room",
      description: "ห้องฝึกอบรมคอมพิวเตอร์และเวิร์กชอป",
      amenities: JSON.stringify(["WiFi", "Computer", "AC", "Interactive Board"]),
      status: "available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=340&fit=crop",
    },
  });

  const room6 = await prisma.room.create({
    data: {
      name: "Tao Meeting Pod",
      floor: 11,
      capacity: 8,
      type: "Focus Room",
      description: "ห้องจดจ่อขนาดเล็กพิเศษสำหรับการประชุม 2-4 ท่าน",
      amenities: JSON.stringify(["WiFi", "Whiteboard"]),
      status: "inactive",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&h=340&fit=crop",
    },
  });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  await prisma.booking.create({
    data: {
      roomId: room1.id,
      organizer: "สมชาย ทดสอบ",
      title: "Project Kick-off",
      date: todayStr,
      timeStart: "09:00",
      timeEnd: "10:30",
      participants: 25,
      status: "confirmed",
    },
  });

  await prisma.booking.create({
    data: {
      roomId: room1.id,
      organizer: "มานะ ทดสอบ",
      title: "Afternoon Session",
      date: todayStr,
      timeStart: "14:00",
      timeEnd: "16:00",
      participants: 15,
      status: "confirmed",
    },
  });

  await prisma.booking.create({
    data: {
      roomId: room2.id,
      organizer: "ศรีนวล ทดสอบ",
      title: "Weekly Sync",
      date: todayStr,
      timeStart: "14:00",
      timeEnd: "15:30",
      participants: 10,
      status: "confirmed",
    },
  });

  await prisma.booking.create({
    data: {
      roomId: room3.id,
      organizer: "สวรรค์ ทดสอบ",
      title: "Brainstorming Session",
      date: tomorrowStr,
      timeStart: "10:00",
      timeEnd: "12:00",
      participants: 15,
      status: "pending",
    },
  });

  await prisma.booking.create({
    data: {
      roomId: room5.id,
      organizer: "อนุวัติ ทดสอบ",
      title: "React Training",
      date: tomorrowStr,
      timeStart: "13:00",
      timeEnd: "16:00",
      participants: 30,
      status: "confirmed",
    },
  });

  await prisma.booking.create({
    data: {
      roomId: room1.id,
      organizer: "เสริมศรี ทดสอบ",
      title: "Client Presentation",
      date: yesterdayStr,
      timeStart: "13:00",
      timeEnd: "14:30",
      participants: 15,
      status: "cancelled",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
