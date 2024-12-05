import type { Player } from '@/types';
import prisma from './prisma';

export async function getPlayers() {
  return await prisma.player.findMany();
}

export async function getPlayer(id: string) {
  return await prisma.player.findUnique({
    where: { id },
  });
}

export async function createPlayer(data: Omit<Player, 'id' | 'createdAt'>) {
  return await prisma.player.create({
    data,
  });
}

export async function updatePlayer(id: string, data: Partial<Player>) {
  return await prisma.player.update({
    where: { id },
    data,
  });
}

export async function deletePlayer(id: string) {
  return await prisma.player.delete({
    where: { id },
  });
}
