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

  const ticketsTypes = await prisma.ticketType.findMany({});
  if(ticketsTypes.length === 0){
    await prisma.ticketType.createMany({
      data: [
        { name: 'Presencial - mask', price: 250, isRemote: false, includesHotel: false },
        { name: 'Online - mask', price: 100, isRemote: true, includesHotel: false },
        { name: 'Sem hotel - Presencial', price: 0, isRemote: false, includesHotel: false },
        { name: 'Com Hotel - Presencial', price: 250, isRemote: false, includesHotel: true },
      ],
    });
  };
  const ticketsType = await prisma.ticketType.findMany({});
  console.log(ticketsType);

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
        { name: 'Double', capacity: 6, hotelId: hotelResort.id },
        { name: 'Triple', capacity: 3, hotelId: hotelResort.id },
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

  const location = await prisma.location.findMany();
  if(location.length === 0) {
    await prisma.location.createMany({
      data: [
        { name: 'Auditório Principal' },
        { name: 'Auditório Lateral' },
        { name: 'Sala de Workshop' }
      ],
    });
  };
  const locations = await prisma.location.findMany({});
  console.log(locations);

  const activities = await prisma.activities.findMany({});
  if(activities.length === 0) {
    await prisma.activities.createMany({
      data: [
        {
          locationId: locations[0].id, 
          slots: 27, 
          name: 'Minecraft: Montando o PC Ideal',
          startsAt: '09:00',
          endsAt: '10:00',
          day: 'Sexta, 22/10'
        },
        {
          locationId: locations[0].id, 
          slots: 0, 
          name: 'LoL: montando o PC ideal',
          startsAt: '10:00',
          endsAt: '11:00',
          day: 'Sexta, 22/10'
        },
        {
          locationId: locations[1].id, 
          slots: 20, 
          name: 'CS-GO: montando o PC ideal',
          startsAt: '15:00',
          endsAt: '16:00',
          day: 'Sexta, 22/10'
        },
        {
          locationId: locations[1].id, 
          slots: 0, 
          name: 'FIFA 23: montando o PC ideal',
          startsAt: '17:00',
          endsAt: '18:00',
          day: 'Sexta, 22/10'
        },
        {
          locationId: locations[2].id, 
          slots: 10, 
          name: 'RDR 2: montando o PC ideal',
          startsAt: '12:00',
          endsAt: '14:00',
          day: 'Sexta, 22/10'
        },
        {
          locationId: locations[0].id, 
          slots: 20, 
          name: 'Minecraft: Montando o PC Ideal',
          startsAt: '09:00',
          endsAt: '10:00',
          day: 'Sábado, 23/10'
        },
        {
          locationId: locations[0].id, 
          slots: 10, 
          name: 'LoL: montando o PC ideal',
          startsAt: '10:00',
          endsAt: '11:00',
          day: 'Sábado, 23/10'
        },
        {
          locationId: locations[1].id, 
          slots: 35, 
          name: 'CS-GO: montando o PC ideal',
          startsAt: '15:00',
          endsAt: '16:00',
          day: 'Sábado, 23/10'
        },
        {
          locationId: locations[1].id, 
          slots: 15, 
          name: 'FIFA 23: montando o PC ideal',
          startsAt: '17:00',
          endsAt: '18:00',
          day: 'Sábado, 23/10'
        },
        {
          locationId: locations[2].id, 
          slots: 55, 
          name: 'RDR 2: montando o PC ideal',
          startsAt: '12:00',
          endsAt: '14:00',
          day: 'Sábado, 23/10'
        },
        {
          locationId: locations[0].id, 
          slots: 0, 
          name: 'Minecraft: Montando o PC Ideal',
          startsAt: '09:00',
          endsAt: '10:00',
          day: 'Domingo, 24/10'
        },
        {
          locationId: locations[0].id, 
          slots: 6, 
          name: 'LoL: montando o PC ideal',
          startsAt: '10:00',
          endsAt: '11:00',
          day: 'Domingo, 24/10'
        },
        {
          locationId: locations[1].id, 
          slots: 13, 
          name: 'CS-GO: montando o PC ideal',
          startsAt: '15:00',
          endsAt: '16:00',
          day: 'Domingo, 24/10'
        },
        {
          locationId: locations[2].id, 
          slots: 0, 
          name: 'RDR 2: montando o PC ideal',
          startsAt: '12:00',
          endsAt: '14:00',
          day: 'Domingo, 24/10'
        },
        {
          locationId: locations[2].id, 
          slots: 15, 
          name: 'FIFA 23: montando o PC ideal',
          startsAt: '16:00',
          endsAt: '17:00',
          day: 'Domingo, 24/10'
        },
      ],
    });
  };

  const Activities = await prisma.activities.findMany({});
  console.log(Activities);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
