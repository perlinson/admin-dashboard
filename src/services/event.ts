import type { Event } from '@/types';
import prisma from './prisma';

export async function getEvents() {
  return await prisma.event.findMany();
}

export async function getEvent(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  });
}

export async function createEvent(data: Omit<Event, 'id'>) {
  return await prisma.event.create({
    data,
  });
}

export async function updateEvent(id: string, data: Partial<Event>) {
  return await prisma.event.update({
    where: { id },
    data,
  });
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: { id },
  });
}

export async function getEventsByProbability(minProbability: number) {
  return await prisma.event.findMany({
    where: {
      probability: {
        gte: minProbability,
      },
    },
    orderBy: {
      probability: 'desc',
    },
  });
}
