import express from 'express';
import * as cityController from '../controllers/cityController';

const router = express.Router();

router.get('/', cityController.getCities);
router.get('/:id', cityController.getCity);
router.post('/', cityController.createCity);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

export default router;
