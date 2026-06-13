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

const subjects = [
  { id: 1, nama: 'Matematika', kelompok: 'Mapel Wajib', guruPengampu: 'Siti Rahmawati, S.Pd', kkm: 75 },
  { id: 2, nama: 'Biologi', kelompok: 'Mapel Peminatan IPA', guruPengampu: 'Maya Lestari, M.Pd', kkm: 78 },
  { id: 3, nama: 'Ekonomi', kelompok: 'Mapel Peminatan IPS', guruPengampu: 'Dedi Kusnadi, S.Pd', kkm: 76 },
];

const schedules = [
  { id: 1, jenis: 'Jadwal Harian', target: 'XI IPA 1', mapel: 'Matematika', guru: 'Siti Rahmawati, S.Pd', waktu: 'Senin 07.00 - 08.30' },
  { id: 2, jenis: 'Jadwal Mingguan', target: 'Kelas X', mapel: 'Biologi', guru: 'Maya Lestari, M.Pd', waktu: 'Selasa & Kamis' },
  { id: 3, jenis: 'Jadwal Ujian', target: 'XII Bahasa', mapel: 'Bahasa Inggris', guru: 'Nina Marlina, S.Pd', waktu: '22 Agu 08.00' },
];

const attendances = [
  { id: 1, siswa: 'Andi Pratama', kelas: 'XI IPA 1', tanggal: '2026-06-13', status: 'Hadir', qr: 'ABS-ANDI-001' },
  { id: 2, siswa: 'Siti Aulia', kelas: 'XI IPS 2', tanggal: '2026-06-13', status: 'Izin', qr: 'ABS-SITI-002' },
  { id: 3, siswa: 'Raka Wijaya', kelas: 'XII Bahasa 1', tanggal: '2026-06-13', status: 'Sakit', qr: 'ABS-RAKA-003' },
];

const grades = [
  { id: 1, siswa: 'Andi Pratama', kelas: 'XI IPA 1', mapel: 'Matematika', jenis: 'UH', nilai: 88 },
  { id: 2, siswa: 'Andi Pratama', kelas: 'XI IPA 1', mapel: 'Biologi', jenis: 'Tugas', nilai: 84 },
  { id: 3, siswa: 'Siti Aulia', kelas: 'XI IPS 2', mapel: 'Ekonomi', jenis: 'UTS', nilai: 91 },
  { id: 4, siswa: 'Raka Wijaya', kelas: 'XII Bahasa 1', mapel: 'Bahasa Inggris', jenis: 'UAS', nilai: 87 },
];

const gradeWeights = {
  Tugas: 15,
  UH: 20,
  UTS: 25,
  UAS: 25,
  Praktik: 10,
  Sikap: 5,
};

const parseBody = (req) => req.body ?? {};
const calculateGradeRanking = () => {
  const grouped = grades.reduce((accumulator, item) => {
    if (!accumulator[item.siswa]) {
      accumulator[item.siswa] = { total: 0, weight: 0, kelas: item.kelas };
    }

    const weight = gradeWeights[item.jenis] || 1;
    accumulator[item.siswa].total += item.nilai * weight;
    accumulator[item.siswa].weight += weight;
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({
      name,
      kelas: value.kelas,
      average: Math.round(value.total / value.weight),
    }))
    .sort((left, right) => right.average - left.average)
    .map((item, index) => ({ ...item, rank: index + 1 }));
};

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

router.get('/subjects', authenticateToken, (req, res) => {
  res.json({ data: subjects });
});

router.post('/subjects', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const payload = parseBody(req);
  const newSubject = { id: Date.now(), ...payload };
  subjects.push(newSubject);
  res.status(201).json({ message: 'Mata pelajaran berhasil ditambahkan', data: newSubject });
});

router.put('/subjects/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = subjects.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  }

  subjects[index] = { ...subjects[index], ...payload };
  return res.json({ message: 'Mata pelajaran berhasil diperbarui', data: subjects[index] });
});

router.delete('/subjects/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = subjects.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  }

  const removed = subjects.splice(index, 1)[0];
  return res.json({ message: 'Mata pelajaran berhasil dihapus', data: removed });
});

router.get('/schedules', authenticateToken, (req, res) => {
  res.json({ data: schedules });
});

router.post('/schedules', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const payload = parseBody(req);
  const newSchedule = { id: Date.now(), ...payload };
  schedules.push(newSchedule);
  res.status(201).json({ message: 'Jadwal berhasil ditambahkan', data: newSchedule });
});

router.put('/schedules/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = schedules.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
  }

  schedules[index] = { ...schedules[index], ...payload };
  return res.json({ message: 'Jadwal berhasil diperbarui', data: schedules[index] });
});

router.delete('/schedules/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah'), (req, res) => {
  const id = Number(req.params.id);
  const index = schedules.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
  }

  const removed = schedules.splice(index, 1)[0];
  return res.json({ message: 'Jadwal berhasil dihapus', data: removed });
});

router.get('/attendance', authenticateToken, (req, res) => {
  res.json({ data: attendances });
});

router.post('/attendance', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const payload = parseBody(req);
  const newAttendance = { id: Date.now(), ...payload };
  attendances.push(newAttendance);
  res.status(201).json({ message: 'Absensi berhasil ditambahkan', data: newAttendance });
});

router.put('/attendance/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = attendances.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Absensi tidak ditemukan' });
  }

  attendances[index] = { ...attendances[index], ...payload };
  return res.json({ message: 'Absensi berhasil diperbarui', data: attendances[index] });
});

router.delete('/attendance/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const id = Number(req.params.id);
  const index = attendances.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Absensi tidak ditemukan' });
  }

  const removed = attendances.splice(index, 1)[0];
  return res.json({ message: 'Absensi berhasil dihapus', data: removed });
});

router.post('/attendance/scan', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const { qr } = parseBody(req);
  const attendance = attendances.find((item) => item.qr.toLowerCase() === String(qr || '').toLowerCase());

  if (!attendance) {
    return res.status(404).json({ message: 'QR absensi tidak ditemukan' });
  }

  return res.json({ message: 'QR absensi berhasil dipindai', data: attendance });
});

router.get('/attendance/summary', authenticateToken, (req, res) => {
  const summary = attendances.reduce(
    (accumulator, item) => {
      accumulator[item.status] = (accumulator[item.status] || 0) + 1;
      return accumulator;
    },
    { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 },
  );

  res.json({ data: summary });
});

router.get('/grades', authenticateToken, (req, res) => {
  res.json({ data: grades });
});

router.post('/grades', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const payload = parseBody(req);
  const newGrade = { id: Date.now(), ...payload };
  grades.push(newGrade);
  res.status(201).json({ message: 'Nilai berhasil ditambahkan', data: newGrade });
});

router.put('/grades/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const id = Number(req.params.id);
  const payload = parseBody(req);
  const index = grades.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Nilai tidak ditemukan' });
  }

  grades[index] = { ...grades[index], ...payload };
  return res.json({ message: 'Nilai berhasil diperbarui', data: grades[index] });
});

router.delete('/grades/:id', authenticateToken, authorizeRoles('superadmin', 'adminsekolah', 'guru'), (req, res) => {
  const id = Number(req.params.id);
  const index = grades.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Nilai tidak ditemukan' });
  }

  const removed = grades.splice(index, 1)[0];
  return res.json({ message: 'Nilai berhasil dihapus', data: removed });
});

router.get('/grades/ranking', authenticateToken, (req, res) => {
  res.json({ data: calculateGradeRanking() });
});

export default router;
