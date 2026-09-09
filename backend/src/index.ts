import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('ThriftLab API is running');
});

app.use('/api/products', productRoutes);

app.use('/api/', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});



// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
