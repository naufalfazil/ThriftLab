import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
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

  try {
    const newMessage = await prisma.contact_messages.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        subject: subject ? String(subject).trim() : '',
        message: String(message).trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim. Kami akan segera membalas.',
      data: { id: newMessage.id },
    });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Gagal menyimpan pesan. Coba lagi nanti.' });
  }
});

export default router;
