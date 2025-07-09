import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import deliveryRoutes from './routes/deliveryRoutes';
import courierRoutes from './routes/courierRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.use("/api", deliveryRoutes);
app.use("/api", courierRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na port:${port}`);
})
