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
    summary:
      'Kelola pengguna, sekolah, database, backup, hak akses, dan monitoring aktivitas di seluruh platform.',
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
    summary:
      'Atur siswa, guru, kelas, mata pelajaran, jadwal, PPDB, keuangan, berita, pengumuman, dan dokumen sekolah.',
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
    summary:
      'Pantau guru, siswa, absensi, nilai, lalu cetak laporan dengan ringkasan yang cepat dibaca.',
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
    summary:
      'Input nilai, absensi, tugas, materi, jurnal mengajar, catatan siswa, dan cetak rapor dari satu dashboard.',
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
    summary:
      'Akses profil, nilai, jadwal, tugas, materi, absensi, pengumuman, dan rapor digital dengan cepat.',
    features: ['Dashboard siswa', 'Profil siswa', 'Nilai', 'Jadwal', 'Tugas', 'Materi', 'Absensi', 'Pengumuman', 'Rapor digital'],
    metrics: [
      ['92%', 'Kehadiran'],
      ['12', 'Tugas aktif'],
      ['86', 'Rata-rata nilai'],
      ['05', 'Pengumuman'],
    ],
  },
  orangtua: {
    headline: 'Kontrol perkembangan anak secara transparan',
    summary:
      'Pantau nilai anak, absensi, pembayaran, dan pengumuman sekolah dari satu portal keluarga.',
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
    summary:
      'Daftar online, unggah dokumen, cetak formulir, dan cek status seleksi tanpa proses manual yang panjang.',
    features: ['Pendaftaran online', 'Upload dokumen', 'Cetak formulir', 'Status seleksi'],
    metrics: [
      ['1.120', 'Pendaftar'],
      ['86%', 'Terverifikasi'],
      ['04', 'Tahap seleksi'],
      ['12', 'Bantuan masuk'],
    ],
  },
};

const modules = [
  {
    title: 'Akademik',
    text: 'Jadwal, nilai, absensi, rapor, materi, dan tugas.'
  },
  {
    title: 'Kesiswaan',
    text: 'Bimbingan konseling, prestasi, dan catatan perkembangan.'
  },
  {
    title: 'Komunikasi',
    text: 'Pengumuman, pesan internal, dan notifikasi orang tua.'
  },
  {
    title: 'Administrasi',
    text: 'Surat menyurat, data induk, dan audit aktivitas.'
  },
  {
    title: 'Keuangan',
    text: 'Tagihan, pembayaran, dan rekap administrasi.'
  },
  {
    title: 'PPDB Online',
    text: 'Pendaftaran, verifikasi, dan pengumuman seleksi.'
  },
];

export default function App() {
  const [activeRole, setActiveRole] = useState('superadmin');
  const current = useMemo(() => roleContent[activeRole], [activeRole]);

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
                <a className="btn btn-primary btn-lg" href="#dashboard">Buka Dashboard</a>
                <a className="btn btn-outline-light btn-lg" href="#modules">Lihat Modul</a>
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

        <section className="row g-4 mb-4" id="dashboard">
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
                {modules.slice(0, 4).map((module) => (
                  <div className="col-md-6" key={module.title}>
                    <div className="panel-card h-100">
                      <h4>{module.title}</h4>
                      <p className="text-muted mb-0">{module.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row g-3 mt-1">
                {current.features?.map((feature) => (
                  <div className="col-md-6" key={feature}>
                    <div className="panel-card h-100">
                      <h4>{feature}</h4>
                      <p className="text-muted mb-0">Fitur aktif untuk peran {roles.find((role) => role.id === activeRole)?.label}.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="glass-card p-4 p-lg-5 mb-4" id="modules">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-3">
            <div>
              <p className="eyebrow mb-1">Modul Inti</p>
              <h3 className="section-title mb-0">Ekosistem sekolah dalam satu aplikasi</h3>
            </div>
            <p className="text-muted mb-0">Siap dikembangkan ke backend, autentikasi, dan integrasi layanan eksternal.</p>
          </div>
          <div className="row g-3">
            {modules.map((module) => (
              <div className="col-md-6 col-lg-4" key={module.title}>
                <div className="module-card h-100">
                  <div className="module-icon">•</div>
                  <h4>{module.title}</h4>
                  <p className="text-muted mb-0">{module.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
