import jwt from 'jsonwebtoken';
import { tempStorage } from '@/lib/tempStorage';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, email } = decoded;

    const { date, timeSlot } = req.body;

    if (!date || !timeSlot) {
      return res.status(400).json({ error: 'Missing booking details' });
    }

    // Prevent double-booking for same slot by same user
    const existing = tempStorage.bookings.findOne({ userId, date, timeSlot });

    if (existing) {
      return res.status(409).json({ error: 'You already booked this slot' });
    }

    const booking = {
      userId,
      email,
      date,
      timeSlot,
      createdAt: new Date()
    };

    tempStorage.bookings.insertOne(booking);

    return res.status(200).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error('Booking Error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
