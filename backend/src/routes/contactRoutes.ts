import { Router, Request, Response } from 'express';

const router = Router();

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const messages: ContactMessage[] = [];

router.post('/', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Field name, email, dan message wajib diisi.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Format email tidak valid.' });
    return;
  }

  const newMessage: ContactMessage = {
    id: messages.length + 1,
    name: String(name).trim(),
    email: String(email).trim(),
    subject: subject ? String(subject).trim() : '',
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);

  res.status(201).json({
    success: true,
    message: 'Pesan berhasil dikirim. Kami akan segera membalas.',
    data: { id: newMessage.id },
  });
});

export default router;
