import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();

  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  console.log({ event });

  const hotel = await prisma.hotel.findFirst({
    where: {
      name: 'Driven World',
    },
  });
  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          name: 'Driven Resort',
          image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?w=320&h=240',
        },
        {
          name: 'Driven Palace',
          image:
            'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?w=320&h=240',
        },
        { name: 'Driven World', image: 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?w=320&h=240' },
      ],
    });
  }
  const hotels = await prisma.hotel.findMany({});
  console.log(hotels);

  const hotelResort = await prisma.hotel.findFirst({
    where: {
      name: 'Driven Resort',
    },
  });

  if (hotelResort) {
    await prisma.room.createMany({
      data: [
        { name: 'Single', capacity: 7, hotelId: hotelResort.id },
        { name: 'Double', capacity: 5, hotelId: hotelResort.id },
        { name: 'Triple', capacity: 2, hotelId: hotelResort.id },
      ],
    });
  }

  const hotelPalace = await prisma.hotel.findFirst({
    where: {
      name: 'Driven Palace',
    },
  });

  if (hotelPalace) {
    await prisma.room.create({
      data: { name: 'Single', capacity: 5, hotelId: hotelPalace.id },
    });
  }

  const rooms = await prisma.room.findMany({});
  console.log(rooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
