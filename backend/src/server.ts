import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
    res.send("Delivery Track Pro API está rodando");
})

app.listen(port, () => {
    console.log(`Servidor rodando na port:${port}`);
})
