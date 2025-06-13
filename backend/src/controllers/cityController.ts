import { Request, Response } from 'express';
import * as cityService from '../services/cityService';

const PAGE_SIZE = 5;

export async function getCities(req: Request, res: Response) {
  const search = (req.query.search as string) || '';
  const page = parseInt(req.query.page as string) || 1;

  const cities = await cityService.searchCities(search, page, PAGE_SIZE);
  res.json(cities);
}

export async function getCity(req: Request, res: Response) {
  const { id } = req.params;
  const city = await cityService.getCityById(id);
  if (!city) return res.status(404).json({ message: 'City not found' });
  res.json(city);
}

export async function createCity(req: Request, res: Response) {
  const { cityName, count } = req.body;
  if (!cityName || typeof count !== 'number') {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const city = await cityService.createCity(cityName, count);
  res.status(201).json(city);
}

export async function updateCity(req: Request, res: Response) {
  const { id } = req.params;
  const { cityName, count } = req.body;
  try {
    const city = await cityService.updateCity(id, { cityName, count });
    res.json(city);
  } catch {
    res.status(404).json({ message: 'City not found' });
  }
}

export async function deleteCity(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await cityService.deleteCity(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'City not found' });
  }
}
