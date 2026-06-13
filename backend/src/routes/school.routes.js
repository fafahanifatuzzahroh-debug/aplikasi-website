import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Dashboard data untuk SIS',
    user: req.user,
  });
});

router.get('/admin/summary', authenticateToken, authorizeRoles('admin', 'kepsek'), (req, res) => {
  res.json({
    schoolName: 'SMA Negeri',
    totalStudents: 1842,
    attendanceRate: 96.8,
  });
});

export default router;
