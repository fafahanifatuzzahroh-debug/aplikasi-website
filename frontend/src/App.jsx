import { useMemo, useState } from 'react';

const roles = [
  { id: 'admin', label: 'Admin' },
  { id: 'kepsek', label: 'Kepala Sekolah' },
  { id: 'guru', label: 'Guru' },
  { id: 'siswa', label: 'Siswa' },
  { id: 'orangtua', label: 'Orang Tua' },
  { id: 'ppdb', label: 'Calon Peserta Didik' },
];

const roleContent = {
  admin: {
    headline: 'Pusat kendali data, akses, dan sinkronisasi sekolah',
    summary:
      'Kelola pengguna, audit aktivitas, validasi data, dan monitoring sistem dengan kontrol berbasis peran yang aman.',
    metrics: [
      ['1.842', 'Data siswa aktif'],
      ['99.2%', 'Sinkronisasi'],
      ['24', 'Perubahan hari ini'],
      ['07', 'Peringatan keamanan'],
    ],
  },
  kepsek: {
    headline: 'Dashboard strategi untuk keputusan berbasis data',
    summary:
      'Pantau mutu sekolah, kehadiran, progres program prioritas, dan dokumen yang menunggu persetujuan.',
    metrics: [
      ['89.4', 'Skor mutu'],
      ['96.8%', 'Kehadiran'],
      ['12', 'Dokumen pending'],
      ['04', 'Program prioritas'],
    ],
  },
  guru: {
    headline: 'Semua kebutuhan mengajar dan penilaian dalam satu layar',
    summary:
      'Kelola presensi, materi, tugas, nilai, dan komunikasi pembelajaran tanpa berpindah aplikasi.',
    metrics: [
      ['8', 'Kelas aktif'],
      ['27', 'Tugas terkirim'],
      ['94%', 'Nilai terinput'],
      ['16', 'Pesan masuk'],
    ],
  },
  siswa: {
    headline: 'Portal belajar yang ringan dan mudah dipahami',
    summary:
      'Lihat jadwal, tugas, absensi, nilai, dan pengumuman sekolah dengan tampilan yang fokus dan cepat.',
    metrics: [
      ['92%', 'Kehadiran'],
      ['12', 'Tugas aktif'],
      ['86', 'Rata-rata nilai'],
      ['05', 'Pengumuman'],
    ],
  },
  orangtua: {
    headline: 'Komunikasi transparan dengan sekolah',
    summary:
      'Pantau kehadiran anak, nilai, pesan wali kelas, dan layanan administrasi dari satu portal.',
    metrics: [
      ['95%', 'Kehadiran anak'],
      ['04', 'Pesan wali kelas'],
      ['02', 'Agenda mendatang'],
      ['100%', 'Administrasi'],
    ],
  },
  ppdb: {
    headline: 'Alur pendaftaran online yang jelas dan cepat',
    summary:
      'Bantu calon peserta didik mendaftar, unggah dokumen, cek status seleksi, dan menerima pengumuman.',
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
  const [activeRole, setActiveRole] = useState('admin');
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
              <h2 className="hero-title">Kelola akademik, komunikasi, dan layanan sekolah dalam satu platform.</h2>
              <p className="lead text-muted mt-3">
                Dirancang untuk Admin, Kepala Sekolah, Guru, Siswa, Orang Tua, dan Calon Peserta Didik dengan akses
                berbasis peran dan pengalaman pengguna yang cepat.
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
                <div className="quick-item">Kelola prioritas hari ini</div>
                <div className="quick-item">Lihat notifikasi penting</div>
                <div className="quick-item">Pantau progres utama</div>
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
