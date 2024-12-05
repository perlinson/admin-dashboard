import type { ResourceConfig } from '@/types';
import prisma from './prisma';

export async function getResourceConfigs() {
  return await prisma.resourceConfig.findMany();
}

export async function getResourceConfig(id: string) {
  return await prisma.resourceConfig.findUnique({
    where: { id },
  });
}

export async function createResourceConfig(data: Omit<ResourceConfig, 'id'>) {
  return await prisma.resourceConfig.create({
    data,
  });
}

export async function updateResourceConfig(
  id: string,
  data: Partial<ResourceConfig>,
) {
  return await prisma.resourceConfig.update({
    where: { id },
    data,
  });
}

export async function deleteResourceConfig(id: string) {
  return await prisma.resourceConfig.delete({
    where: { id },
  });
}

export async function getResourceConfigByName(name: string) {
  return await prisma.resourceConfig.findFirst({
    where: { name },
  });
}
