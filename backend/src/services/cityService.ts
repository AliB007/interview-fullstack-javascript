import prisma from '../prisma/client';

export async function searchCities(search: string, page: number, pageSize: number) {
  return prisma.city.findMany({
    where: {
      cityName: {
        contains: search,
        mode: 'insensitive',
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { cityName: 'asc' },
  });
}

export async function getCityById(id: string) {
  return prisma.city.findUnique({ where: { id } });
}

export async function createCity(cityName: string, count: number) {
  return prisma.city.create({ data: { cityName, count } });
}

export async function updateCity(id: string, data: { cityName?: string; count?: number }) {
  return prisma.city.update({ where: { id }, data });
}

export async function deleteCity(id: string) {
  return prisma.city.delete({ where: { id } });
}
