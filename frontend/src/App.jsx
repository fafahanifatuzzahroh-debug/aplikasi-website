import { useMemo, useState } from 'react';

const roles = [
  { id: 'superadmin', label: 'Super Admin' },
  { id: 'adminsekolah', label: 'Admin Sekolah' },
  { id: 'kepsek', label: 'Kepala Sekolah' },
  { id: 'guru', label: 'Guru' },
  { id: 'siswa', label: 'Siswa' },
  { id: 'orangtua', label: 'Orang Tua' },
  { id: 'ppdb', label: 'Calon Siswa' },
];

const roleContent = {
  superadmin: {
    headline: 'Akses penuh untuk kontrol seluruh sistem',
    summary: 'Kelola pengguna, sekolah, database, backup, hak akses, dan monitoring aktivitas di seluruh platform.',
    features: ['Kelola pengguna', 'Kelola sekolah', 'Kelola database', 'Kelola backup', 'Kelola hak akses', 'Monitoring aktivitas'],
    metrics: [
      ['128', 'Pengguna aktif'],
      ['07', 'Sekolah terhubung'],
      ['99.9%', 'Ketersediaan'],
      ['04', 'Backup harian'],
    ],
  },
  adminsekolah: {
    headline: 'Pusat operasional sekolah yang lengkap dan efisien',
    summary: 'Atur siswa, guru, kelas, mata pelajaran, jadwal, PPDB, keuangan, berita, pengumuman, dan dokumen sekolah.',
    features: ['Dashboard', 'Kelola siswa', 'Kelola guru', 'Kelola kelas', 'Kelola mata pelajaran', 'Kelola jadwal', 'Kelola PPDB', 'Kelola keuangan', 'Kelola berita', 'Kelola pengumuman', 'Kelola dokumen'],
    metrics: [
      ['1.842', 'Data siswa aktif'],
      ['127', 'Guru terdata'],
      ['46', 'Kelas berjalan'],
      ['18', 'Agenda sekolah'],
    ],
  },
  kepsek: {
    headline: 'Dashboard laporan dan pengawasan sekolah',
    summary: 'Pantau guru, siswa, absensi, nilai, lalu cetak laporan dengan ringkasan yang cepat dibaca.',
    features: ['Dashboard laporan', 'Monitoring guru', 'Monitoring siswa', 'Monitoring absensi', 'Monitoring nilai', 'Cetak laporan'],
    metrics: [
      ['89.4', 'Skor mutu'],
      ['96.8%', 'Kehadiran'],
      ['12', 'Dokumen pending'],
      ['04', 'Program prioritas'],
    ],
  },
  guru: {
    headline: 'Ruang kerja guru untuk pembelajaran sehari-hari',
    summary: 'Input nilai, absensi, tugas, materi, jurnal mengajar, catatan siswa, dan cetak rapor dari satu dashboard.',
    features: ['Input nilai', 'Input absensi', 'Input tugas', 'Upload materi', 'Input jurnal mengajar', 'Input catatan siswa', 'Cetak rapor'],
    metrics: [
      ['8', 'Kelas aktif'],
      ['27', 'Tugas terkirim'],
      ['94%', 'Nilai terinput'],
      ['16', 'Pesan masuk'],
    ],
  },
  siswa: {
    headline: 'Dashboard siswa yang ringkas dan informatif',
    summary: 'Akses profil, nilai, jadwal, tugas, materi, absensi, pengumuman, dan rapor digital dengan cepat.',
    features: ['Dashboard siswa', 'Profil siswa', 'Nilai', 'Jadwal', 'Tugas', 'Materi', 'Absensi', 'Pengumuman', 'Rapor digital', 'Kelas & jurusan'],
    metrics: [
      ['92%', 'Kehadiran'],
      ['12', 'Tugas aktif'],
      ['86', 'Rata-rata nilai'],
      ['05', 'Pengumuman'],
    ],
  },
  orangtua: {
    headline: 'Kontrol perkembangan anak secara transparan',
    summary: 'Pantau nilai anak, absensi, pembayaran, dan pengumuman sekolah dari satu portal keluarga.',
    features: ['Monitoring nilai anak', 'Monitoring absensi', 'Monitoring pembayaran', 'Pengumuman sekolah'],
    metrics: [
      ['95%', 'Kehadiran anak'],
      ['04', 'Pesan wali kelas'],
      ['02', 'Agenda mendatang'],
      ['100%', 'Administrasi'],
    ],
  },
  ppdb: {
    headline: 'Layanan pendaftaran online untuk calon siswa',
    summary: 'Daftar online, unggah dokumen, cetak formulir, dan cek status seleksi tanpa proses manual yang panjang.',
    features: ['Pendaftaran online', 'Upload dokumen', 'Cetak formulir', 'Status seleksi'],
    metrics: [
      ['1.120', 'Pendaftar'],
      ['86%', 'Terverifikasi'],
      ['04', 'Tahap seleksi'],
      ['12', 'Bantuan masuk'],
    ],
  },
};

const mainTotals = [
  { value: '1.842', label: 'Total siswa', accent: 'students' },
  { value: '127', label: 'Total guru', accent: 'guru' },
  { value: '46', label: 'Total kelas', accent: 'kelas' },
  { value: '12', label: 'Total jurusan', accent: 'jurusan' },
  { value: '1.268', label: 'Total alumni', accent: 'alumni' },
  { value: 'Rp 4,8 M', label: 'Total pembayaran', accent: 'payment' },
];

const studentTrend = [82, 88, 91, 96, 102, 109, 113];
const gradeTrend = [74, 76, 78, 80, 83, 85, 87];
const attendanceTrend = [94, 95, 97, 96, 98, 98, 99];

const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];

const calendarEvents = [
  { date: '17 Jul', title: 'Awal Tahun Ajaran', time: '07.30', note: 'Upacara pembukaan dan pembagian kelas.' },
  { date: '21 Jul', title: 'Rapat Orang Tua', time: '09.00', note: 'Sosialisasi kurikulum dan tata tertib sekolah.' },
  { date: '28 Jul', title: 'Pembagian Tugas', time: '10.00', note: 'Penerbitan tugas minggu pertama untuk semua kelas.' },
  { date: '02 Agu', title: 'Simulasi Asesmen', time: '08.00', note: 'Try out akademik untuk kelas XI dan XII.' },
  { date: '08 Agu', title: 'Kegiatan Ekstrakurikuler', time: '14.00', note: 'Registrasi ulang kegiatan minat dan bakat.' },
];

const announcements = [
  { title: 'Pengumuman libur nasional', text: 'Sekolah libur pada tanggal 17 Agustus dan kegiatan belajar dipindah ke jadwal berikutnya.' },
  { title: 'Rapat koordinasi guru', text: 'Seluruh wali kelas diminta hadir pada pukul 13.00 di ruang multimedia.' },
  { title: 'PPDB gelombang 1 dibuka', text: 'Pendaftaran calon siswa dibuka dengan verifikasi berkas otomatis.' },
];

const ppdbFields = [
  { name: 'nisn', label: 'NISN', type: 'text', placeholder: 'Masukkan NISN' },
  { name: 'namaLengkap', label: 'Nama Lengkap', type: 'text', placeholder: 'Nama sesuai dokumen' },
  { name: 'tempatLahir', label: 'Tempat Lahir', type: 'text', placeholder: 'Kota / Kabupaten' },
  { name: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },
  { name: 'jenisKelamin', label: 'Jenis Kelamin', type: 'select', options: ['Laki-laki', 'Perempuan'] },
  { name: 'agama', label: 'Agama', type: 'text', placeholder: 'Agama' },
  { name: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Alamat lengkap' },
  { name: 'noHp', label: 'No HP', type: 'text', placeholder: '08xxxxxxxxxx' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'nama@email.com' },
  { name: 'asalSekolah', label: 'Asal Sekolah', type: 'text', placeholder: 'Nama sekolah sebelumnya' },
  { name: 'namaOrangTua', label: 'Nama Orang Tua', type: 'text', placeholder: 'Nama ayah / ibu / wali' },
];

const ppdbUploads = ['Pas Foto', 'Kartu Keluarga', 'Akta Kelahiran', 'Ijazah', 'Raport'];

const ppdbFlow = [
  'Nomor pendaftaran otomatis',
  'Verifikasi berkas',
  'Seleksi otomatis',
  'Pengumuman hasil',
  'Cetak bukti pendaftaran',
];

const classPrograms = [
  { name: 'X IPA 1', waliKelas: 'Siti Rahmawati, S.Pd', capacity: 36, major: 'IPA', distribution: '12 siswa PPDB, 24 siswa naik kelas' },
  { name: 'X IPA 2', waliKelas: 'Dedi Kusnadi, S.Pd', capacity: 36, major: 'IPA', distribution: '11 siswa PPDB, 25 siswa pindahan' },
  { name: 'XI IPS 1', waliKelas: 'Maya Lestari, M.Pd', capacity: 36, major: 'IPS', distribution: '36 siswa aktif' },
  { name: 'XII Bahasa', waliKelas: 'Nina Marlina, S.Pd', capacity: 32, major: 'Bahasa', distribution: '32 siswa aktif' },
];

const majors = [
  { name: 'IPA', desc: 'Pembagian fokus pada sains, eksperimen, dan analisis numerik.' },
  { name: 'IPS', desc: 'Pembagian fokus pada ekonomi, sosial, geografi, dan sejarah.' },
  { name: 'Bahasa', desc: 'Pembagian fokus pada literasi, komunikasi, dan bahasa asing.' },
];

const autoDistribution = [
  { step: 'Input data siswa', note: 'Siswa baru direkam dari PPDB atau modul data siswa.' },
  { step: 'Pemetaan jurusan', note: 'Sistem menandai jurusan sesuai hasil seleksi dan minat.' },
  { step: 'Alokasi kelas', note: 'Siswa ditempatkan ke X IPA 1, X IPA 2, XI IPS 1, atau XII Bahasa.' },
  { step: 'Validasi wali kelas', note: 'Wali kelas memeriksa jumlah siswa dan kapasitas kelas.' },
];

const subjectGroups = [
  { name: 'Mapel Wajib', description: 'Bahasa Indonesia, Matematika, Bahasa Inggris, dan PPKn.' },
  { name: 'Mapel Peminatan IPA', description: 'Fisika, Kimia, dan Biologi.' },
  { name: 'Mapel Peminatan IPS', description: 'Ekonomi, Sejarah, Geografi, dan Sosiologi.' },
  { name: 'Mapel Peminatan Bahasa', description: 'Sastra Indonesia, Bahasa Asing, dan Linguistik.' },
];

const subjectSeed = [
  { id: 1, nama: 'Matematika', kelompok: 'Mapel Wajib', guruPengampu: 'Siti Rahmawati, S.Pd', kkm: 75 },
  { id: 2, nama: 'Biologi', kelompok: 'Mapel Peminatan IPA', guruPengampu: 'Maya Lestari, M.Pd', kkm: 78 },
  { id: 3, nama: 'Ekonomi', kelompok: 'Mapel Peminatan IPS', guruPengampu: 'Dedi Kusnadi, S.Pd', kkm: 76 },
  { id: 4, nama: 'Bahasa Inggris', kelompok: 'Mapel Wajib', guruPengampu: 'Nina Marlina, S.Pd', kkm: 74 },
];

const scheduleSeed = [
  { id: 1, jenis: 'Jadwal Harian', target: 'XI IPA 1', mapel: 'Matematika', guru: 'Siti Rahmawati, S.Pd', waktu: 'Senin 07.00 - 08.30' },
  { id: 2, jenis: 'Jadwal Mingguan', target: 'Kelas X', mapel: 'Biologi', guru: 'Maya Lestari, M.Pd', waktu: 'Selasa & Kamis' },
  { id: 3, jenis: 'Jadwal Ujian', target: 'XII Bahasa', mapel: 'Bahasa Inggris', guru: 'Nina Marlina, S.Pd', waktu: '22 Agu 08.00' },
  { id: 4, jenis: 'Jadwal Guru', target: 'Dedi Kusnadi, S.Pd', mapel: 'Ekonomi', guru: 'Dedi Kusnadi, S.Pd', waktu: 'Selasa, Kamis, Sabtu' },
  { id: 5, jenis: 'Jadwal Siswa', target: 'Andi Pratama', mapel: 'Matematika', guru: 'Siti Rahmawati, S.Pd', waktu: 'Hari efektif sekolah' },
];

const subjectFormFields = [
  { name: 'nama', label: 'Nama Mata Pelajaran', type: 'text', placeholder: 'Contoh: Fisika' },
  { name: 'kelompok', label: 'Kelompok Mapel', type: 'text', placeholder: 'Contoh: Mapel Peminatan IPA' },
  { name: 'guruPengampu', label: 'Guru Pengampu', type: 'text', placeholder: 'Nama guru pengampu' },
  { name: 'kkm', label: 'KKM', type: 'number', placeholder: 'Contoh: 75' },
];

const scheduleFormFields = [
  { name: 'jenis', label: 'Jenis Jadwal', type: 'text', placeholder: 'Jadwal Harian / Mingguan / Ujian / Guru / Siswa' },
  { name: 'target', label: 'Target', type: 'text', placeholder: 'Kelas, guru, atau siswa' },
  { name: 'mapel', label: 'Mata Pelajaran', type: 'text', placeholder: 'Nama mapel' },
  { name: 'guru', label: 'Guru', type: 'text', placeholder: 'Nama guru' },
  { name: 'waktu', label: 'Waktu', type: 'text', placeholder: 'Contoh: Senin 07.00 - 08.30' },
];

const studentFormFields = [
  { name: 'nis', label: 'NIS', type: 'text', placeholder: 'Nomor induk sekolah' },
  { name: 'nisn', label: 'NISN', type: 'text', placeholder: 'Nomor induk nasional' },
  { name: 'nama', label: 'Nama', type: 'text', placeholder: 'Nama lengkap siswa' },
  { name: 'kelas', label: 'Kelas', type: 'text', placeholder: 'Contoh: XI IPA 1' },
  { name: 'jurusan', label: 'Jurusan', type: 'text', placeholder: 'Contoh: IPA' },
  { name: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Alamat siswa' },
  { name: 'orangTua', label: 'Orang Tua', type: 'text', placeholder: 'Nama orang tua/wali' },
  { name: 'riwayatPendidikan', label: 'Riwayat Pendidikan', type: 'textarea', placeholder: 'Contoh: SMP Negeri 2 Bandung' },
];

const teacherFormFields = [
  { name: 'nama', label: 'Nama Guru', type: 'text', placeholder: 'Nama lengkap guru' },
  { name: 'nip', label: 'NIP', type: 'text', placeholder: 'Nomor induk pegawai' },
  { name: 'mapel', label: 'Mata Pelajaran', type: 'text', placeholder: 'Contoh: Matematika' },
  { name: 'sertifikasi', label: 'Data Sertifikasi', type: 'text', placeholder: 'Contoh: Sertifikat Pendidik 2023' },
  { name: 'riwayatMengajar', label: 'Riwayat Mengajar', type: 'textarea', placeholder: 'Riwayat penugasan mengajar' },
  { name: 'jadwalMengajar', label: 'Jadwal Mengajar', type: 'text', placeholder: 'Contoh: Senin, Rabu, Jumat' },
  { name: 'absensi', label: 'Absensi Guru', type: 'text', placeholder: 'Contoh: Hadir 98%' },
];

const studentSeed = [
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
  {
    id: 3,
    nis: '2024003',
    nisn: '0038456125',
    nama: 'Raka Wijaya',
    kelas: 'XII Bahasa 1',
    jurusan: 'Bahasa',
    alamat: 'Jl. Mawar 21',
    orangTua: 'Hendra Wijaya',
    riwayatPendidikan: 'SMP Al-Hikmah',
  },
];

const teacherSeed = [
  {
    id: 1,
    nama: 'Siti Rahmawati, S.Pd',
    nip: '19881217 201903 2 001',
    mapel: 'Matematika',
    sertifikasi: 'Sertifikat Pendidik 2022',
    riwayatMengajar: 'Wali kelas XI IPA sejak 2021 dan pengampu kelas Olimpiade.',
    jadwalMengajar: 'Senin, Rabu, Jumat',
    absensi: 'Hadir 98%',
  },
  {
    id: 2,
    nama: 'Dedi Kusnadi, S.Pd',
    nip: '19790712 200804 1 002',
    mapel: 'Bahasa Indonesia',
    sertifikasi: 'Sertifikasi Guru 2021',
    riwayatMengajar: 'Mengampu kelas X dan XII serta pembina literasi sekolah.',
    jadwalMengajar: 'Selasa, Kamis, Sabtu',
    absensi: 'Hadir 100%',
  },
  {
    id: 3,
    nama: 'Maya Lestari, M.Pd',
    nip: '19850203 201607 2 003',
    mapel: 'Biologi',
    sertifikasi: 'Sertifikat Pendidik 2023',
    riwayatMengajar: 'Koordinator laboratorium dan pengajar praktikum.',
    jadwalMengajar: 'Senin, Selasa, Kamis',
    absensi: 'Hadir 97%',
  },
];

function downloadCsv(filename, rows) {
  const escapeCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = rows.map((row) => row.map(escapeCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function BarChart({ title, subtitle, labels, values, tone }) {
  const maxValue = Math.max(...values);

  return (
    <article className="chart-card">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
        <div>
          <h4 className="mb-1">{title}</h4>
          <p className="text-muted mb-0">{subtitle}</p>
        </div>
        <span className={`chart-badge chart-badge-${tone}`}>Tren 7 bulan</span>
      </div>
      <div className="bar-chart">
        {values.map((value, index) => (
          <div className="bar-item" key={`${title}-${labels[index]}`}>
            <div className="bar-value">{value}</div>
            <div className="bar-track">
              <div className={`bar-fill bar-fill-${tone}`} style={{ height: `${(value / maxValue) * 100}%` }} />
            </div>
            <div className="bar-label">{labels[index]}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

function LineChart({ title, subtitle, labels, values, tone }) {
  const width = 360;
  const height = 160;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = Math.max(maxValue - minValue, 1);
  const step = width / (values.length - 1);
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - minValue) / range) * (height - 18) - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <article className="chart-card">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
        <div>
          <h4 className="mb-1">{title}</h4>
          <p className="text-muted mb-0">{subtitle}</p>
        </div>
        <span className={`chart-badge chart-badge-${tone}`}>Update mingguan</span>
      </div>
      <svg className="line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <defs>
          <linearGradient id={`line-${tone}`} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <polyline points={points} className={`line-path line-path-${tone}`} />
        <polygon points={`${points} ${width},${height} 0,${height}`} className={`line-area line-area-${tone}`} />
      </svg>
      <div className="chart-axis">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </article>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow mb-1">{eyebrow}</p>
        <h3 className="section-title mb-0">{title}</h3>
      </div>
      {subtitle ? <p className="text-muted mb-0 section-copy">{subtitle}</p> : null}
    </div>
  );
}

export default function App() {
  const [activeRole, setActiveRole] = useState('superadmin');
  const [ppdbForm, setPpdbForm] = useState({
    nisn: '',
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    alamat: '',
    noHp: '',
    email: '',
    asalSekolah: '',
    namaOrangTua: '',
  });
  const [submission, setSubmission] = useState(null);
  const [studentRecords, setStudentRecords] = useState(studentSeed);
  const [teacherRecords, setTeacherRecords] = useState(teacherSeed);
  const [studentQuery, setStudentQuery] = useState('');
  const [teacherQuery, setTeacherQuery] = useState('');
  const [studentImportName, setStudentImportName] = useState('Belum ada file');
  const [teacherImportName, setTeacherImportName] = useState('Belum ada file');
  const [studentEditId, setStudentEditId] = useState(null);
  const [teacherEditId, setTeacherEditId] = useState(null);
  const [activeClassName, setActiveClassName] = useState(classPrograms[0].name);
  const [selectedStudentId, setSelectedStudentId] = useState(studentSeed[0].id);
  const [selectedTeacherId, setSelectedTeacherId] = useState(teacherSeed[0].id);
  const [subjectRecords, setSubjectRecords] = useState(subjectSeed);
  const [scheduleRecords, setScheduleRecords] = useState(scheduleSeed);
  const [subjectQuery, setSubjectQuery] = useState('');
  const [scheduleQuery, setScheduleQuery] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectSeed[0].id);
  const [selectedScheduleId, setSelectedScheduleId] = useState(scheduleSeed[0].id);
  const [subjectEditId, setSubjectEditId] = useState(null);
  const [scheduleEditId, setScheduleEditId] = useState(null);
  const [subjectForm, setSubjectForm] = useState({ nama: '', kelompok: '', guruPengampu: '', kkm: '' });
  const [scheduleForm, setScheduleForm] = useState({ jenis: '', target: '', mapel: '', guru: '', waktu: '' });
  const [studentForm, setStudentForm] = useState({
    nis: '',
    nisn: '',
    nama: '',
    kelas: '',
    jurusan: '',
    alamat: '',
    orangTua: '',
    riwayatPendidikan: '',
  });
  const [teacherForm, setTeacherForm] = useState({
    nama: '',
    nip: '',
    mapel: '',
    sertifikasi: '',
    riwayatMengajar: '',
    jadwalMengajar: '',
    absensi: '',
  });

  const current = useMemo(() => roleContent[activeRole], [activeRole]);
  const registrationNumber = useMemo(() => `PPDB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`, []);
  const filteredStudents = useMemo(
    () => studentRecords.filter((item) => [item.nis, item.nisn, item.nama, item.kelas, item.jurusan].join(' ').toLowerCase().includes(studentQuery.toLowerCase())),
    [studentRecords, studentQuery],
  );
  const filteredTeachers = useMemo(
    () => teacherRecords.filter((item) => [item.nama, item.nip, item.mapel, item.sertifikasi].join(' ').toLowerCase().includes(teacherQuery.toLowerCase())),
    [teacherRecords, teacherQuery],
  );
  const selectedStudent = useMemo(
    () => studentRecords.find((item) => item.id === selectedStudentId) || studentRecords[0],
    [studentRecords, selectedStudentId],
  );
  const selectedTeacher = useMemo(
    () => teacherRecords.find((item) => item.id === selectedTeacherId) || teacherRecords[0],
    [teacherRecords, selectedTeacherId],
  );
  const activeClass = useMemo(
    () => classPrograms.find((item) => item.name === activeClassName) || classPrograms[0],
    [activeClassName],
  );
  const filteredSubjects = useMemo(
    () => subjectRecords.filter((item) => [item.nama, item.kelompok, item.guruPengampu, String(item.kkm)].join(' ').toLowerCase().includes(subjectQuery.toLowerCase())),
    [subjectRecords, subjectQuery],
  );
  const filteredSchedules = useMemo(
    () => scheduleRecords.filter((item) => [item.jenis, item.target, item.mapel, item.guru, item.waktu].join(' ').toLowerCase().includes(scheduleQuery.toLowerCase())),
    [scheduleRecords, scheduleQuery],
  );
  const selectedSubject = useMemo(
    () => subjectRecords.find((item) => item.id === selectedSubjectId) || subjectRecords[0],
    [subjectRecords, selectedSubjectId],
  );
  const selectedSchedule = useMemo(
    () => scheduleRecords.find((item) => item.id === selectedScheduleId) || scheduleRecords[0],
    [scheduleRecords, selectedScheduleId],
  );

  const resetStudentForm = () => {
    setStudentEditId(null);
    setStudentForm({ nis: '', nisn: '', nama: '', kelas: '', jurusan: '', alamat: '', orangTua: '', riwayatPendidikan: '' });
  };

  const resetTeacherForm = () => {
    setTeacherEditId(null);
    setTeacherForm({ nama: '', nip: '', mapel: '', sertifikasi: '', riwayatMengajar: '', jadwalMengajar: '', absensi: '' });
  };

  const handleStudentFormChange = (event) => {
    const { name, value } = event.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeacherFormChange = (event) => {
    const { name, value } = event.target;
    setTeacherForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectFormChange = (event) => {
    const { name, value } = event.target;
    setSubjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleFormChange = (event) => {
    const { name, value } = event.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    const payload = { ...studentForm };

    if (studentEditId) {
      setStudentRecords((prev) => prev.map((item) => (item.id === studentEditId ? { ...item, ...payload } : item)));
      setSelectedStudentId(studentEditId);
    } else {
      const nextId = Date.now();
      setStudentRecords((prev) => [...prev, { id: nextId, ...payload }]);
      setSelectedStudentId(nextId);
    }

    resetStudentForm();
  };

  const handleTeacherSubmit = (event) => {
    event.preventDefault();
    const payload = { ...teacherForm };

    if (teacherEditId) {
      setTeacherRecords((prev) => prev.map((item) => (item.id === teacherEditId ? { ...item, ...payload } : item)));
      setSelectedTeacherId(teacherEditId);
    } else {
      const nextId = Date.now();
      setTeacherRecords((prev) => [...prev, { id: nextId, ...payload }]);
      setSelectedTeacherId(nextId);
    }

    resetTeacherForm();
  };

  const handleSubjectSubmit = (event) => {
    event.preventDefault();
    const payload = { ...subjectForm, kkm: Number(subjectForm.kkm) || 0 };

    if (subjectEditId) {
      setSubjectRecords((prev) => prev.map((item) => (item.id === subjectEditId ? { ...item, ...payload } : item)));
      setSelectedSubjectId(subjectEditId);
    } else {
      const nextId = Date.now();
      setSubjectRecords((prev) => [...prev, { id: nextId, ...payload }]);
      setSelectedSubjectId(nextId);
    }

    setSubjectEditId(null);
    setSubjectForm({ nama: '', kelompok: '', guruPengampu: '', kkm: '' });
  };

  const handleScheduleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...scheduleForm };

    if (scheduleEditId) {
      setScheduleRecords((prev) => prev.map((item) => (item.id === scheduleEditId ? { ...item, ...payload } : item)));
      setSelectedScheduleId(scheduleEditId);
    } else {
      const nextId = Date.now();
      setScheduleRecords((prev) => [...prev, { id: nextId, ...payload }]);
      setSelectedScheduleId(nextId);
    }

    setScheduleEditId(null);
    setScheduleForm({ jenis: '', target: '', mapel: '', guru: '', waktu: '' });
  };

  const handleSubjectEdit = (subject) => {
    setSubjectEditId(subject.id);
    setSubjectForm({ nama: subject.nama, kelompok: subject.kelompok, guruPengampu: subject.guruPengampu, kkm: String(subject.kkm) });
  };

  const handleScheduleEdit = (schedule) => {
    setScheduleEditId(schedule.id);
    setScheduleForm({ jenis: schedule.jenis, target: schedule.target, mapel: schedule.mapel, guru: schedule.guru, waktu: schedule.waktu });
  };

  const handleSubjectDelete = (id) => {
    setSubjectRecords((prev) => prev.filter((item) => item.id !== id));
    setSelectedSubjectId((currentId) => (currentId === id ? subjectSeed[0].id : currentId));
  };

  const handleScheduleDelete = (id) => {
    setScheduleRecords((prev) => prev.filter((item) => item.id !== id));
    setSelectedScheduleId((currentId) => (currentId === id ? scheduleSeed[0].id : currentId));
  };

  const handleStudentEdit = (student) => {
    setStudentEditId(student.id);
    setStudentForm({
      nis: student.nis,
      nisn: student.nisn,
      nama: student.nama,
      kelas: student.kelas,
      jurusan: student.jurusan,
      alamat: student.alamat,
      orangTua: student.orangTua,
      riwayatPendidikan: student.riwayatPendidikan,
    });
  };

  const handleTeacherEdit = (teacher) => {
    setTeacherEditId(teacher.id);
    setTeacherForm({
      nama: teacher.nama,
      nip: teacher.nip,
      mapel: teacher.mapel,
      sertifikasi: teacher.sertifikasi,
      riwayatMengajar: teacher.riwayatMengajar,
      jadwalMengajar: teacher.jadwalMengajar,
      absensi: teacher.absensi,
    });
  };

  const handleStudentDelete = (id) => {
    setStudentRecords((prev) => prev.filter((item) => item.id !== id));
    setSelectedStudentId((currentId) => (currentId === id ? studentSeed[0].id : currentId));
  };

  const handleTeacherDelete = (id) => {
    setTeacherRecords((prev) => prev.filter((item) => item.id !== id));
    setSelectedTeacherId((currentId) => (currentId === id ? teacherSeed[0].id : currentId));
  };

  const handleStudentExport = () => {
    const rows = [
      ['NIS', 'NISN', 'Nama', 'Kelas', 'Jurusan', 'Alamat', 'Orang Tua', 'Riwayat Pendidikan'],
      ...filteredStudents.map((item) => [item.nis, item.nisn, item.nama, item.kelas, item.jurusan, item.alamat, item.orangTua, item.riwayatPendidikan]),
    ];
    downloadCsv('data-siswa.csv', rows);
  };

  const handleTeacherExport = () => {
    const rows = [
      ['Nama Guru', 'NIP', 'Mata Pelajaran', 'Sertifikasi', 'Riwayat Mengajar', 'Jadwal Mengajar', 'Absensi'],
      ...filteredTeachers.map((item) => [item.nama, item.nip, item.mapel, item.sertifikasi, item.riwayatMengajar, item.jadwalMengajar, item.absensi]),
    ];
    downloadCsv('data-guru.csv', rows);
  };

  const handleStudentImport = (event) => {
    setStudentImportName(event.target.files?.[0]?.name || 'Belum ada file');
  };

  const handleTeacherImport = (event) => {
    setTeacherImportName(event.target.files?.[0]?.name || 'Belum ada file');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPpdbForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmission({
      nomorPendaftaran: registrationNumber,
      nama: ppdbForm.namaLengkap || 'Calon siswa',
      status: 'Berkas diterima dan menunggu verifikasi',
    });
  };

  return (
    <div className="app-shell">
      <div className="hero-bg hero-bg-one" />
      <div className="hero-bg hero-bg-two" />

      <header className="topbar container py-4">
        <div>
          <p className="eyebrow mb-1">SMA Negeri</p>
          <h1 className="display-title mb-0">Sistem Informasi Sekolah Terintegrasi</h1>
        </div>
        <div className="role-tabs d-flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role.id}
              className={`btn role-pill ${activeRole === role.id ? 'active' : ''}`}
              onClick={() => setActiveRole(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container pb-5">
        <section className="hero-card glass-card p-4 p-lg-5 mb-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <span className="badge soft-badge mb-3">Modern • Responsif • Aman</span>
              <h2 className="hero-title">Semua peran sekolah bekerja dalam satu sistem yang terintegrasi.</h2>
              <p className="lead text-muted mt-3">
                Dirancang untuk Super Admin, Admin Sekolah, Kepala Sekolah, Guru, Siswa, Orang Tua, dan Calon Siswa
                dengan akses berbasis peran dan pengalaman pengguna yang cepat.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a className="btn btn-primary btn-lg" href="#dashboard-utama">Buka Dashboard</a>
                <a className="btn btn-outline-light btn-lg" href="#ppdb-online">PPDB Online</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="status-card mb-3">
                <div className="status-dot" />
                <div>
                  <div className="text-uppercase small text-secondary">Status Sistem</div>
                  <strong>Operasional stabil</strong>
                </div>
              </div>
              <div className="row g-3">
                {current.metrics.map(([value, label]) => (
                  <div className="col-6" key={label}>
                    <div className="metric-card h-100">
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="dashboard-utama">
          <SectionTitle
            eyebrow="Dashboard Utama"
            title="Ringkasan operasional sekolah dalam satu tampilan"
            subtitle="KPI utama, grafik tren, kalender akademik, dan pengumuman terbaru tampil berdampingan agar mudah dipantau."
          />

          <div className="row g-3 mt-1">
            {mainTotals.map((item) => (
              <div className="col-6 col-lg-4" key={item.label}>
                <div className="total-card h-100">
                  <div className={`total-icon total-icon-${item.accent}`}>●</div>
                  <div>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mt-1">
            <div className="col-lg-4">
              <BarChart
                title="Grafik Siswa"
                subtitle="Pertumbuhan data siswa aktif selama tujuh bulan terakhir."
                labels={chartLabels}
                values={studentTrend}
                tone="students"
              />
            </div>
            <div className="col-lg-4">
              <LineChart
                title="Grafik Nilai"
                subtitle="Rata-rata nilai kelas menunjukkan tren kenaikan yang konsisten."
                labels={chartLabels}
                values={gradeTrend}
                tone="grades"
              />
            </div>
            <div className="col-lg-4">
              <LineChart
                title="Grafik Absensi"
                subtitle="Rekap kehadiran siswa terjaga pada level yang stabil."
                labels={chartLabels}
                values={attendanceTrend}
                tone="attendance"
              />
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-lg-5">
              <article className="calendar-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
                  <div>
                    <p className="eyebrow mb-1">Kalender Akademik</p>
                    <h4 className="mb-0">Agenda sekolah terdekat</h4>
                  </div>
                  <span className="chart-badge chart-badge-calendar">Semester berjalan</span>
                </div>
                <div className="calendar-list">
                  {calendarEvents.map((event) => (
                    <div className="calendar-item" key={`${event.date}-${event.title}`}>
                      <div className="calendar-date">{event.date}</div>
                      <div>
                        <strong>{event.title}</strong>
                        <p>{event.time} • {event.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="col-lg-7">
              <article className="announcement-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
                  <div>
                    <p className="eyebrow mb-1">Pengumuman Terbaru</p>
                    <h4 className="mb-0">Informasi penting untuk seluruh warga sekolah</h4>
                  </div>
                  <span className="chart-badge chart-badge-announcement">Terbaru</span>
                </div>
                <div className="announcement-list">
                  {announcements.map((item, index) => (
                    <div className="announcement-item" key={item.title}>
                      <div className="announcement-index">0{index + 1}</div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="row g-4 mb-4" id="dashboard-role">
          <aside className="col-lg-4">
            <div className="glass-card p-4 h-100">
              <p className="eyebrow mb-1">Akses Cepat</p>
              <h3 className="section-title">{roles.find((role) => role.id === activeRole)?.label}</h3>
              <p className="text-muted">{current.summary}</p>
              <div className="quick-list">
                {current.features?.slice(0, 3).map((feature) => (
                  <div className="quick-item" key={feature}>{feature}</div>
                ))}
              </div>
            </div>
          </aside>
          <section className="col-lg-8">
            <div className="glass-card p-4 p-lg-5 h-100">
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                <div>
                  <p className="eyebrow mb-1">Dashboard Peran</p>
                  <h3 className="section-title mb-0">{current.headline}</h3>
                </div>
                <span className="mini-badge">{roles.find((role) => role.id === activeRole)?.label}</span>
              </div>
              <div className="row g-3 mt-3">
                {current.features?.map((feature) => (
                  <div className="col-md-6" key={feature}>
                    <div className="panel-card h-100">
                      <h4>{feature}</h4>
                      <p className="text-muted mb-0">Fitur aktif untuk peran {roles.find((role) => role.id === activeRole)?.label}.</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row g-3 mt-1">
                {roles.slice(0, 4).map((role) => (
                  <div className="col-md-6" key={role.id}>
                    <div className="panel-card h-100">
                      <h4>{role.label}</h4>
                      <p className="text-muted mb-0">Akses berbasis peran disesuaikan dengan tugas dan tanggung jawab pengguna.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="modules">
          <SectionTitle
            eyebrow="Modul Inti"
            title="Ekosistem sekolah dalam satu aplikasi"
            subtitle="Semua layanan utama sekolah dipusatkan agar mudah diakses dari dashboard masing-masing pengguna."
          />
          <div className="row g-3 mt-1">
            {[
              ['Akademik', 'Jadwal, nilai, absensi, rapor, materi, dan tugas.'],
              ['Kesiswaan', 'Bimbingan konseling, prestasi, dan catatan perkembangan.'],
              ['Kelas & Jurusan', 'Tambah kelas, tambah jurusan, wali kelas, dan pembagian siswa otomatis.'],
              ['Komunikasi', 'Pengumuman, pesan internal, dan notifikasi orang tua.'],
              ['Administrasi', 'Surat menyurat, data induk, dan audit aktivitas.'],
              ['Keuangan', 'Tagihan, pembayaran, dan rekap administrasi.'],
              ['PPDB Online', 'Pendaftaran, verifikasi, dan pengumuman seleksi.'],
            ].map(([title, text]) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="module-card h-100">
                  <div className="module-icon">•</div>
                  <h4>{title}</h4>
                  <p className="text-muted mb-0">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="ppdb-online">
          <SectionTitle
            eyebrow="Modul PPDB Online"
            title="Formulir pendaftaran online calon siswa"
            subtitle="Nomor pendaftaran otomatis, verifikasi berkas, seleksi otomatis, pengumuman hasil, dan cetak bukti pendaftaran."
          />

          <div className="row g-4 mt-1">
            <div className="col-lg-7">
              <form className="ppdb-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  {ppdbFields.map((field) => (
                    <div className={field.type === 'textarea' ? 'col-12' : 'col-md-6'} key={field.name}>
                      <label className="form-label text-light fw-semibold" htmlFor={field.name}>{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          className="form-control form-control-lg sis-input"
                          id={field.name}
                          name={field.name}
                          rows="3"
                          placeholder={field.placeholder}
                          value={ppdbForm[field.name]}
                          onChange={handleChange}
                          required={field.name !== 'alamat' ? true : true}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          className="form-select form-select-lg sis-input"
                          id={field.name}
                          name={field.name}
                          value={ppdbForm[field.name]}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Pilih {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="form-control form-control-lg sis-input"
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={ppdbForm[field.name]}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-12">
                    <label className="form-label text-light fw-semibold">Upload Dokumen</label>
                    <div className="upload-grid">
                      {ppdbUploads.map((upload) => (
                        <div className="upload-box" key={upload}>
                          <strong>{upload}</strong>
                          <span>Unggah file pendukung</span>
                          <input className="form-control form-control-sm sis-file" type="file" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">Kirim Pendaftaran</button>
                  <button type="button" className="btn btn-outline-light btn-lg" onClick={() => window.print()}>Cetak Formulir</button>
                </div>
              </form>
            </div>

            <div className="col-lg-5">
              <div className="ppdb-side card-stack">
                <article className="ppdb-summary-card">
                  <p className="eyebrow mb-1">Nomor Pendaftaran Otomatis</p>
                  <h4 className="mb-2">{registrationNumber}</h4>
                  <p className="text-muted mb-0">
                    Nomor ini akan digunakan untuk verifikasi dan pencetakan bukti pendaftaran.
                  </p>
                </article>

                <article className="ppdb-summary-card">
                  <p className="eyebrow mb-1">Alur PPDB</p>
                  <div className="feature-chip-list">
                    {ppdbFlow.map((item) => (
                      <span className="feature-chip" key={item}>{item}</span>
                    ))}
                  </div>
                </article>

                <article className="ppdb-summary-card">
                  <p className="eyebrow mb-1">Hasil Pendaftaran</p>
                  <h4 className="mb-2">{submission ? submission.status : 'Menunggu pendaftaran baru'}</h4>
                  <p className="text-muted mb-0">
                    {submission
                      ? `Bukti pendaftaran untuk ${submission.nama} siap dicetak dengan nomor ${submission.nomorPendaftaran}.`
                      : 'Setelah formulir dikirim, sistem menampilkan status verifikasi dan hasil seleksi.'}
                  </p>
                </article>

                <article className="ppdb-summary-card">
                  <p className="eyebrow mb-1">Fitur PPDB</p>
                  <div className="stack-gap">
                    {['Nomor pendaftaran otomatis', 'Verifikasi berkas', 'Seleksi otomatis', 'Pengumuman hasil', 'Cetak bukti pendaftaran'].map((feature) => (
                      <div className="feature-line" key={feature}>{feature}</div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="data-siswa">
          <SectionTitle
            eyebrow="Modul Data Siswa"
            title="Kelola data siswa secara cepat dan terstruktur"
            subtitle="Tambah, edit, hapus, detail, pencarian siswa, impor Excel, ekspor Excel, dan cetak PDF tersedia di satu modul."
          />

          <div className="module-toolbar mt-4">
            <div className="toolbar-meta">
              <strong>{filteredStudents.length} siswa ditemukan</strong>
              <span>Import: {studentImportName}</span>
            </div>
            <div className="toolbar-actions">
              <input className="form-control sis-input" type="search" placeholder="Cari siswa" value={studentQuery} onChange={(event) => setStudentQuery(event.target.value)} />
              <label className="btn btn-outline-light file-button">
                Import Excel
                <input type="file" accept=".xlsx,.xls,.csv" onChange={handleStudentImport} hidden />
              </label>
              <button className="btn btn-outline-light" type="button" onClick={handleStudentExport}>Export Excel</button>
              <button className="btn btn-outline-light" type="button" onClick={() => window.print()}>Cetak PDF</button>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-lg-4">
              <div className="detail-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <p className="eyebrow mb-1">{studentEditId ? 'Edit Siswa' : 'Tambah Siswa'}</p>
                    <h4 className="mb-0">Form data siswa</h4>
                  </div>
                  {studentEditId ? <span className="chart-badge chart-badge-students">Mode edit</span> : null}
                </div>
                <form className="data-form" onSubmit={handleStudentSubmit}>
                  <div className="row g-3">
                    {studentFormFields.map((field) => (
                      <div className={field.type === 'textarea' ? 'col-12' : 'col-12'} key={field.name}>
                        <label className="form-label text-light fw-semibold" htmlFor={`student-${field.name}`}>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea className="form-control sis-input" id={`student-${field.name}`} name={field.name} rows="2" placeholder={field.placeholder} value={studentForm[field.name]} onChange={handleStudentFormChange} required />
                        ) : (
                          <input className="form-control sis-input" id={`student-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} value={studentForm[field.name]} onChange={handleStudentFormChange} required />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button className="btn btn-primary" type="submit">{studentEditId ? 'Simpan Perubahan' : 'Tambah Siswa'}</button>
                    <button className="btn btn-outline-light" type="button" onClick={resetStudentForm}>Batal</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="table-card h-100">
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle data-table mb-0">
                    <thead>
                      <tr>
                        <th>NIS</th>
                        <th>Nama</th>
                        <th>Kelas</th>
                        <th>Jurusan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className={selectedStudent?.id === student.id ? 'table-active' : ''}>
                          <td>{student.nis}</td>
                          <td>{student.nama}</td>
                          <td>{student.kelas}</td>
                          <td>{student.jurusan}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedStudentId(student.id)}>Detail</button>
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => handleStudentEdit(student)}>Edit</button>
                              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleStudentDelete(student.id)}>Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="detail-grid mt-3">
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Detail Siswa</p>
                    <h4 className="mb-3">{selectedStudent?.nama}</h4>
                    <div className="detail-list">
                      <div><span>NISN</span><strong>{selectedStudent?.nisn}</strong></div>
                      <div><span>Alamat</span><strong>{selectedStudent?.alamat}</strong></div>
                      <div><span>Orang Tua</span><strong>{selectedStudent?.orangTua}</strong></div>
                      <div><span>Riwayat Pendidikan</span><strong>{selectedStudent?.riwayatPendidikan}</strong></div>
                    </div>
                  </div>
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Fitur Modul</p>
                    <div className="feature-chip-list">
                      {['Tambah siswa', 'Edit siswa', 'Hapus siswa', 'Detail siswa', 'Pencarian siswa', 'Import Excel', 'Export Excel', 'Cetak PDF'].map((feature) => (
                        <span className="feature-chip" key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="kelas-jurusan">
          <SectionTitle
            eyebrow="Modul Kelas dan Jurusan"
            title="Kelola kelas, jurusan, wali kelas, dan pembagian siswa otomatis"
            subtitle="Contoh kelas tersedia: X IPA 1, X IPA 2, XI IPS 1, dan XII Bahasa dengan pengaturan wali kelas dan kapasitas."
          />

          <div className="row g-4 mt-1">
            <div className="col-lg-5">
              <div className="detail-card h-100">
                <p className="eyebrow mb-1">Tambah Kelas & Jurusan</p>
                <h4 className="mb-3">Struktur pembagian belajar</h4>
                <div className="stack-gap">
                  {majors.map((major) => (
                    <div className="major-card" key={major.name}>
                      <strong>{major.name}</strong>
                      <span>{major.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="eyebrow mb-1">Pembagian siswa otomatis</p>
                  <div className="stack-gap">
                    {autoDistribution.map((item, index) => (
                      <div className="calendar-item compact-item" key={item.step}>
                        <div className="announcement-index">0{index + 1}</div>
                        <div>
                          <strong>{item.step}</strong>
                          <p>{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="table-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <p className="eyebrow mb-1">Daftar Kelas</p>
                    <h4 className="mb-0">Wali kelas dan kapasitas</h4>
                  </div>
                  <span className="chart-badge chart-badge-calendar">Pembagian otomatis</span>
                </div>
                <div className="class-selector mb-3">
                  {classPrograms.map((item) => (
                    <button
                      key={item.name}
                      className={`btn role-pill ${activeClassName === item.name ? 'active' : ''}`}
                      type="button"
                      onClick={() => setActiveClassName(item.name)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle data-table mb-0">
                    <thead>
                      <tr>
                        <th>Kelas</th>
                        <th>Jurusan</th>
                        <th>Wali Kelas</th>
                        <th>Kapasitas</th>
                        <th>Pembagian Siswa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classPrograms.map((item) => (
                        <tr key={item.name} className={activeClass?.name === item.name ? 'table-active' : ''}>
                          <td>{item.name}</td>
                          <td>{item.major}</td>
                          <td>{item.waliKelas}</td>
                          <td>{item.capacity}</td>
                          <td>{item.distribution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row g-3 mt-3">
                  <div className="col-md-6">
                    <div className="detail-card h-100">
                      <p className="eyebrow mb-1">Kelas Aktif</p>
                      <h4 className="mb-0">{activeClass.name}</h4>
                      <p className="text-muted mb-0 mt-2">Wali kelas: {activeClass.waliKelas}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="detail-card h-100">
                      <p className="eyebrow mb-1">Info Jurusan</p>
                      <h4 className="mb-0">{activeClass.major}</h4>
                      <p className="text-muted mb-0 mt-2">Pembagian siswa otomatis mengikuti kapasitas dan hasil seleksi.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="mata-pelajaran">
          <SectionTitle
            eyebrow="Modul Mata Pelajaran"
            title="CRUD mata pelajaran, kelompok mapel, guru pengampu, dan KKM"
            subtitle="Kelola mapel wajib dan peminatan dalam satu tempat dengan tampilan yang mendukung pencarian dan detail data."
          />

          <div className="module-toolbar mt-4">
            <div className="toolbar-meta">
              <strong>{filteredSubjects.length} mapel ditemukan</strong>
              <span>Kelompok mapel aktif: {subjectGroups.length}</span>
            </div>
            <div className="toolbar-actions">
              <input className="form-control sis-input" type="search" placeholder="Cari mata pelajaran" value={subjectQuery} onChange={(event) => setSubjectQuery(event.target.value)} />
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-lg-4">
              <div className="detail-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <p className="eyebrow mb-1">{subjectEditId ? 'Edit Mapel' : 'Tambah Mapel'}</p>
                    <h4 className="mb-0">Form mata pelajaran</h4>
                  </div>
                  {subjectEditId ? <span className="chart-badge chart-badge-students">Mode edit</span> : null}
                </div>
                <form className="data-form" onSubmit={handleSubjectSubmit}>
                  <div className="row g-3">
                    {subjectFormFields.map((field) => (
                      <div className="col-12" key={field.name}>
                        <label className="form-label text-light fw-semibold" htmlFor={`subject-${field.name}`}>{field.label}</label>
                        <input className="form-control sis-input" id={`subject-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} value={subjectForm[field.name]} onChange={handleSubjectFormChange} required />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button className="btn btn-primary" type="submit">{subjectEditId ? 'Simpan Perubahan' : 'Tambah Mapel'}</button>
                    <button className="btn btn-outline-light" type="button" onClick={() => { setSubjectEditId(null); setSubjectForm({ nama: '', kelompok: '', guruPengampu: '', kkm: '' }); }}>Batal</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="table-card h-100">
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle data-table mb-0">
                    <thead>
                      <tr>
                        <th>Mapel</th>
                        <th>Kelompok</th>
                        <th>Guru Pengampu</th>
                        <th>KKM</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubjects.map((subject) => (
                        <tr key={subject.id} className={selectedSubject?.id === subject.id ? 'table-active' : ''}>
                          <td>{subject.nama}</td>
                          <td>{subject.kelompok}</td>
                          <td>{subject.guruPengampu}</td>
                          <td>{subject.kkm}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedSubjectId(subject.id)}>Detail</button>
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => handleSubjectEdit(subject)}>Edit</button>
                              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleSubjectDelete(subject.id)}>Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="detail-grid mt-3">
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Detail Mapel</p>
                    <h4 className="mb-3">{selectedSubject?.nama}</h4>
                    <div className="detail-list">
                      <div><span>Kelompok Mapel</span><strong>{selectedSubject?.kelompok}</strong></div>
                      <div><span>Guru Pengampu</span><strong>{selectedSubject?.guruPengampu}</strong></div>
                      <div><span>KKM</span><strong>{selectedSubject?.kkm}</strong></div>
                    </div>
                  </div>
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Kelompok Mapel</p>
                    <div className="stack-gap">
                      {subjectGroups.map((group) => (
                        <div className="major-card" key={group.name}>
                          <strong>{group.name}</strong>
                          <span>{group.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="jadwal-pelajaran">
          <SectionTitle
            eyebrow="Modul Jadwal Pelajaran"
            title="Jadwal harian, mingguan, ujian, guru, dan siswa"
            subtitle="Semua jenis jadwal sekolah dapat dikelola dalam satu modul dengan pencarian dan detail yang jelas."
          />

          <div className="module-toolbar mt-4">
            <div className="toolbar-meta">
              <strong>{filteredSchedules.length} jadwal ditemukan</strong>
              <span>Jenis jadwal: harian, mingguan, ujian, guru, dan siswa</span>
            </div>
            <div className="toolbar-actions">
              <input className="form-control sis-input" type="search" placeholder="Cari jadwal" value={scheduleQuery} onChange={(event) => setScheduleQuery(event.target.value)} />
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-lg-4">
              <div className="detail-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <p className="eyebrow mb-1">{scheduleEditId ? 'Edit Jadwal' : 'Tambah Jadwal'}</p>
                    <h4 className="mb-0">Form jadwal pelajaran</h4>
                  </div>
                  {scheduleEditId ? <span className="chart-badge chart-badge-attendance">Mode edit</span> : null}
                </div>
                <form className="data-form" onSubmit={handleScheduleSubmit}>
                  <div className="row g-3">
                    {scheduleFormFields.map((field) => (
                      <div className="col-12" key={field.name}>
                        <label className="form-label text-light fw-semibold" htmlFor={`schedule-${field.name}`}>{field.label}</label>
                        <input className="form-control sis-input" id={`schedule-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} value={scheduleForm[field.name]} onChange={handleScheduleFormChange} required />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button className="btn btn-primary" type="submit">{scheduleEditId ? 'Simpan Perubahan' : 'Tambah Jadwal'}</button>
                    <button className="btn btn-outline-light" type="button" onClick={() => { setScheduleEditId(null); setScheduleForm({ jenis: '', target: '', mapel: '', guru: '', waktu: '' }); }}>Batal</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="table-card h-100">
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle data-table mb-0">
                    <thead>
                      <tr>
                        <th>Jenis</th>
                        <th>Target</th>
                        <th>Mapel</th>
                        <th>Guru</th>
                        <th>Waktu</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((schedule) => (
                        <tr key={schedule.id} className={selectedSchedule?.id === schedule.id ? 'table-active' : ''}>
                          <td>{schedule.jenis}</td>
                          <td>{schedule.target}</td>
                          <td>{schedule.mapel}</td>
                          <td>{schedule.guru}</td>
                          <td>{schedule.waktu}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedScheduleId(schedule.id)}>Detail</button>
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => handleScheduleEdit(schedule)}>Edit</button>
                              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleScheduleDelete(schedule.id)}>Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="detail-grid mt-3">
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Detail Jadwal</p>
                    <h4 className="mb-3">{selectedSchedule?.jenis}</h4>
                    <div className="detail-list">
                      <div><span>Target</span><strong>{selectedSchedule?.target}</strong></div>
                      <div><span>Mata Pelajaran</span><strong>{selectedSchedule?.mapel}</strong></div>
                      <div><span>Guru</span><strong>{selectedSchedule?.guru}</strong></div>
                      <div><span>Waktu</span><strong>{selectedSchedule?.waktu}</strong></div>
                    </div>
                  </div>
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Jenis Jadwal</p>
                    <div className="feature-chip-list">
                      {['Jadwal harian', 'Jadwal mingguan', 'Jadwal ujian', 'Jadwal guru', 'Jadwal siswa'].map((feature) => (
                        <span className="feature-chip" key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="data-guru">
          <SectionTitle
            eyebrow="Modul Data Guru"
            title="CRUD guru dengan sertifikasi, riwayat, jadwal, dan absensi"
            subtitle="Data guru diorganisasi agar mudah dicari, diperbarui, dan dipantau oleh sekolah maupun kepala sekolah."
          />

          <div className="module-toolbar mt-4">
            <div className="toolbar-meta">
              <strong>{filteredTeachers.length} guru ditemukan</strong>
              <span>Import: {teacherImportName}</span>
            </div>
            <div className="toolbar-actions">
              <input className="form-control sis-input" type="search" placeholder="Cari guru" value={teacherQuery} onChange={(event) => setTeacherQuery(event.target.value)} />
              <label className="btn btn-outline-light file-button">
                Import Excel
                <input type="file" accept=".xlsx,.xls,.csv" onChange={handleTeacherImport} hidden />
              </label>
              <button className="btn btn-outline-light" type="button" onClick={handleTeacherExport}>Export Excel</button>
              <button className="btn btn-outline-light" type="button" onClick={() => window.print()}>Cetak PDF</button>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-lg-4">
              <div className="detail-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <p className="eyebrow mb-1">{teacherEditId ? 'Edit Guru' : 'Tambah Guru'}</p>
                    <h4 className="mb-0">Form data guru</h4>
                  </div>
                  {teacherEditId ? <span className="chart-badge chart-badge-grades">Mode edit</span> : null}
                </div>
                <form className="data-form" onSubmit={handleTeacherSubmit}>
                  <div className="row g-3">
                    {teacherFormFields.map((field) => (
                      <div className="col-12" key={field.name}>
                        <label className="form-label text-light fw-semibold" htmlFor={`teacher-${field.name}`}>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea className="form-control sis-input" id={`teacher-${field.name}`} name={field.name} rows="2" placeholder={field.placeholder} value={teacherForm[field.name]} onChange={handleTeacherFormChange} required />
                        ) : (
                          <input className="form-control sis-input" id={`teacher-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} value={teacherForm[field.name]} onChange={handleTeacherFormChange} required />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button className="btn btn-primary" type="submit">{teacherEditId ? 'Simpan Perubahan' : 'Tambah Guru'}</button>
                    <button className="btn btn-outline-light" type="button" onClick={resetTeacherForm}>Batal</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="table-card h-100">
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle data-table mb-0">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Mapel</th>
                        <th>Sertifikasi</th>
                        <th>Jadwal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeachers.map((teacher) => (
                        <tr key={teacher.id} className={selectedTeacher?.id === teacher.id ? 'table-active' : ''}>
                          <td>{teacher.nama}</td>
                          <td>{teacher.mapel}</td>
                          <td>{teacher.sertifikasi}</td>
                          <td>{teacher.jadwalMengajar}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedTeacherId(teacher.id)}>Detail</button>
                              <button className="btn btn-sm btn-outline-light" type="button" onClick={() => handleTeacherEdit(teacher)}>Edit</button>
                              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleTeacherDelete(teacher.id)}>Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="detail-grid mt-3">
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Detail Guru</p>
                    <h4 className="mb-3">{selectedTeacher?.nama}</h4>
                    <div className="detail-list">
                      <div><span>NIP</span><strong>{selectedTeacher?.nip}</strong></div>
                      <div><span>Riwayat Mengajar</span><strong>{selectedTeacher?.riwayatMengajar}</strong></div>
                      <div><span>Jadwal Mengajar</span><strong>{selectedTeacher?.jadwalMengajar}</strong></div>
                      <div><span>Absensi Guru</span><strong>{selectedTeacher?.absensi}</strong></div>
                    </div>
                  </div>
                  <div className="detail-card">
                    <p className="eyebrow mb-1">Fitur Modul</p>
                    <div className="feature-chip-list">
                      {['CRUD Guru', 'Data Sertifikasi', 'Riwayat Mengajar', 'Jadwal Mengajar', 'Absensi Guru'].map((feature) => (
                        <span className="feature-chip" key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
