import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Thrift Lab API is running');
});

app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});