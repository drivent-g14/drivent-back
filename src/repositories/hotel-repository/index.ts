import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: {
        include: {
          Booking: true,
        },
      },
    },
    take: 3,
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
