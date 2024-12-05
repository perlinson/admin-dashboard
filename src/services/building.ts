import type { Building } from '@/types';
import prisma from './prisma';

export async function getBuildings() {
  return await prisma.building.findMany();
}

export async function getBuilding(id: string) {
  return await prisma.building.findUnique({
    where: { id },
  });
}

export async function createBuilding(data: Omit<Building, 'id'>) {
  return await prisma.building.create({
    data,
  });
}

export async function updateBuilding(id: string, data: Partial<Building>) {
  return await prisma.building.update({
    where: { id },
    data,
  });
}

export async function deleteBuilding(id: string) {
  return await prisma.building.delete({
    where: { id },
  });
}

export async function getBuildingsByType(type: string) {
  return await prisma.building.findMany({
    where: { type },
  });
}
