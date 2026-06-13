import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

const demoUsers = [
  { id: 1, name: 'Admin Sekolah', role: 'admin', email: 'admin@sma.sch.id', password: bcrypt.hashSync('password123', 10) },
  { id: 2, name: 'Kepala Sekolah', role: 'kepsek', email: 'kepsek@sma.sch.id', password: bcrypt.hashSync('password123', 10) },
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = demoUsers.find((item) => item.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Email atau kata sandi salah' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' },
  );

  return res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});

export default router;
