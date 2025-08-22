import bcrypt from 'bcryptjs';
import { tempStorage } from '@/lib/tempStorage';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Check if user already exists
    const existingUser = tempStorage.users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    tempStorage.users.insertOne({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
