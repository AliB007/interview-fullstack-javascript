import express from 'express';
import cityRoutes from './routes/cityRoutes';

const app = express();

app.use(express.json());
app.use('/cities', cityRoutes);


export default app;
