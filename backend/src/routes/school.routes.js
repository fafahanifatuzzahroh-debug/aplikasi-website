import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

const students = [
  {
    id: 1,
    nis: '2024001',
    nisn: '0038456123',
    nama: 'Andi Pratama',
    kelas: 'XI IPA 1',
    jurusan: 'IPA',
    alamat: 'Jl. Melati 12',
    orangTua: 'Budi Santoso',
    riwayatPendidikan: 'SMP Negeri 2 Bandung',
  },
  {
    id: 2,
    nis: '2024002',
    nisn: '0038456124',
    nama: 'Siti Aulia',
    kelas: 'XI IPS 2',
    jurusan: 'IPS',
    alamat: 'Jl. Kenanga 8',
    orangTua: 'Rahmawati',
    riwayatPendidikan: 'SMP Negeri 5 Bandung',
  },
];

const teachers = [
  {
    id: 1,
    nama: 'Siti Rahmawati, S.Pd',
    nip: '19881217 201903 2 001',
    mapel: 'Matematika',
    sertifikasi: 'Sertifikat Pendidik 2022',
    riwayatMengajar: 'Wali kelas XI IPA sejak 2021.',
    jadwalMengajar: 'Senin, Rabu, Jumat',
    absensi: 'Hadir 98%',
  },
  {
    id: 2,
    nama: 'Dedi Kusnadi, S.Pd',
    nip: '19790712 200804 1 002',
    mapel: 'Bahasa Indonesia',
    sertifikasi: 'Sertifikasi Guru 2021',
    riwayatMengajar: 'Pembina literasi sekolah.',
    jadwalMengajar: 'Selasa, Kamis, Sabtu',
    absensi: 'Hadir 100%',
  },
];

const classes = [
  { id: 1, name: 'X IPA 1', major: 'IPA', waliKelas: 'Siti Rahmawati, S.Pd', capacity: 36, distribution: '12 siswa PPDB, 24 siswa naik kelas' },
  { id: 2, name: 'X IPA 2', major: 'IPA', waliKelas: 'Dedi Kusnadi, S.Pd', capacity: 36, distribution: '11 siswa PPDB, 25 siswa pindahan' },
  { id: 3, name: 'XI IPS 1', major: 'IPS', waliKelas: 'Maya Lestari, M.Pd', capacity: 36, distribution: '36 siswa aktif' },
  { id: 4, name: 'XII Bahasa', major: 'Bahasa', waliKelas: 'Nina Marlina, S.Pd', capacity: 32, distribution: '32 siswa aktif' },
];

const majors = [
  { id: 1, name: 'IPA', description: 'Fokus pada sains, eksperimen, dan analisis numerik.' },
  { id: 2, name: 'IPS', description: 'Fokus pada ekonomi, sosial, geografi, dan sejarah.' },
  { id: 3, name: 'Bahasa', description: 'Fokus pada literasi, komunikasi, dan bahasa asing.' },
];

const parseBody = (req) => req.body ?? {};

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

router.get('/students', authenticateToken, (req, res) => {
  res.json({ data: students });
});

router.post('/students', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const student = parseBody(req);
  const newStudent = { id: Date.now(), ...student };
  students.push(newStudent);
  res.status(201).json({ message: 'Siswa berhasil ditambahkan', data: newStudent });
});

router.put('/students/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  students[index] = { ...students[index], ...payload };
  return res.json({ message: 'Siswa berhasil diperbarui', data: students[index] });
});

router.delete('/students/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }

  const removed = students.splice(index, 1)[0];
  return res.json({ message: 'Siswa berhasil dihapus', data: removed });
});

router.get('/teachers', authenticateToken, (req, res) => {
  res.json({ data: teachers });
});

router.post('/teachers', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const teacher = parseBody(req);
  const newTeacher = { id: Date.now(), ...teacher };
  teachers.push(newTeacher);
  res.status(201).json({ message: 'Guru berhasil ditambahkan', data: newTeacher });
});

router.put('/teachers/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = teachers.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Guru tidak ditemukan' });
  }

  teachers[index] = { ...teachers[index], ...payload };
  return res.json({ message: 'Guru berhasil diperbarui', data: teachers[index] });
});

router.delete('/teachers/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = teachers.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Guru tidak ditemukan' });
  }

  const removed = teachers.splice(index, 1)[0];
  return res.json({ message: 'Guru berhasil dihapus', data: removed });
});

router.get('/classes', authenticateToken, (req, res) => {
  res.json({ data: classes });
});

router.post('/classes', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const payload = parseBody(req);
  const newClass = { id: Date.now(), ...payload };
  classes.push(newClass);
  res.status(201).json({ message: 'Kelas berhasil ditambahkan', data: newClass });
});

router.put('/classes/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = classes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Kelas tidak ditemukan' });
  }

  classes[index] = { ...classes[index], ...payload };
  return res.json({ message: 'Kelas berhasil diperbarui', data: classes[index] });
});

router.delete('/classes/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = classes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Kelas tidak ditemukan' });
  }

  const removed = classes.splice(index, 1)[0];
  return res.json({ message: 'Kelas berhasil dihapus', data: removed });
});

router.get('/majors', authenticateToken, (req, res) => {
  res.json({ data: majors });
});

router.post('/majors', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const payload = parseBody(req);
  const newMajor = { id: Date.now(), ...payload };
  majors.push(newMajor);
  res.status(201).json({ message: 'Jurusan berhasil ditambahkan', data: newMajor });
});

router.put('/majors/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = majors.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Jurusan tidak ditemukan' });
  }

  majors[index] = { ...majors[index], ...payload };
  return res.json({ message: 'Jurusan berhasil diperbarui', data: majors[index] });
});

router.delete('/majors/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = majors.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Jurusan tidak ditemukan' });
  }

  const removed = majors.splice(index, 1)[0];
  return res.json({ message: 'Jurusan berhasil dihapus', data: removed });
});

export default router;
