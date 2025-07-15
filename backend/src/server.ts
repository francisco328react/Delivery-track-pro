import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import deliveryRoutes from './routes/deliveryRoutes';
import courierRoutes from './routes/courierRoutes';
import userRoutes from './routes/userRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.use(deliveryRoutes);
app.use(courierRoutes);
app.use(userRoutes);
app.use(dashboardRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na port:${port}`);
})
