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

  const current = useMemo(() => roleContent[activeRole], [activeRole]);
  const registrationNumber = useMemo(() => `PPDB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`, []);

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
      </main>
    </div>
  );
}
