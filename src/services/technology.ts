import type { Technology } from '@/types';
import prisma from './prisma';

export async function getTechnologies() {
  return await prisma.technology.findMany();
}

export async function getTechnology(id: string) {
  return await prisma.technology.findUnique({
    where: { id },
  });
}

export async function createTechnology(data: Omit<Technology, 'id'>) {
  return await prisma.technology.create({
    data,
  });
}

export async function updateTechnology(id: string, data: Partial<Technology>) {
  return await prisma.technology.update({
    where: { id },
    data,
  });
}

export async function deleteTechnology(id: string) {
  return await prisma.technology.delete({
    where: { id },
  });
}

export async function getTechnologiesByResearchTime(maxTime: number) {
  return await prisma.technology.findMany({
    where: {
      researchTime: {
        lte: maxTime,
      },
    },
  });
}
