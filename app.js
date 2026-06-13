const roleTabs = document.querySelector('#roleTabs');
const schoolStats = document.querySelector('#schoolStats');
const trustPoints = document.querySelector('#trustPoints');
const roleTitle = document.querySelector('#roleTitle');
const roleSummary = document.querySelector('#roleSummary');
const roleActions = document.querySelector('#roleActions');
const roleAlerts = document.querySelector('#roleAlerts');
const roleHeadline = document.querySelector('#roleHeadline');
const roleBadge = document.querySelector('#roleBadge');
const roleMetrics = document.querySelector('#roleMetrics');
const roleTimeline = document.querySelector('#roleTimeline');
const integrationList = document.querySelector('#integrationList');
const moduleGrid = document.querySelector('#moduleGrid');
const publicServices = document.querySelector('#publicServices');
const year = document.querySelector('#year');

const roles = [
  {
    id: 'admin',
    label: 'Admin',
    title: 'Admin Sekolah',
    badge: 'Operasional & Data',
    headline: 'Pusat kendali data, akses, dan sinkronisasi sekolah',
    summary:
      'Memastikan data induk rapi, hak akses aman, integrasi berjalan, dan seluruh modul operasional selalu sinkron.',
    actions: [
      { title: 'Kelola pengguna', text: 'Atur akun guru, siswa, orang tua, dan hak akses berbasis peran.' },
      { title: 'Sinkronisasi data', text: 'Kirim pembaruan ke sistem akademik dan laporan internal.' },
      { title: 'Audit aktivitas', text: 'Pantau log keamanan, perubahan data, dan notifikasi anomali.' },
    ],
    alerts: [
      { title: '3 akun perlu verifikasi', text: 'Mohon tinjau akun baru yang belum lolos validasi.' },
      { title: 'Backup malam siap', text: 'Cadangan otomatis berhasil dibuat pada 01.00 WIB.' },
    ],
    metrics: [
      { value: '1.842', label: 'Data siswa aktif' },
      { value: '99.2%', label: 'Tingkat sinkronisasi' },
      { value: '24', label: 'Perubahan hari ini' },
      { value: '07', label: 'Peringatan keamanan' },
    ],
    timeline: [
      { title: '07.00 - Validasi data masuk', text: 'Sinkronisasi absensi dan pembaruan biodata awal hari.' },
      { title: '12.30 - Rekap layanan', text: 'Review tiket bantuan dan permintaan surat sekolah.' },
      { title: '16.00 - Backup otomatis', text: 'Snapshot data harian dan pengiriman laporan ke kepala sekolah.' },
    ],
  },
  {
    id: 'kepala',
    label: 'Kepsek',
    title: 'Kepala Sekolah',
    badge: 'Strategi & Pengawasan',
    headline: 'Gambaran menyeluruh untuk keputusan yang cepat dan akurat',
    summary:
      'Memonitor KPI akademik, disiplin, kehadiran, keuangan, dan tindak lanjut kebijakan berbasis data nyata.',
    actions: [
      { title: 'Pantau KPI', text: 'Lihat capaian akademik, kehadiran, dan tren kedisiplinan.' },
      { title: 'Persetujuan cepat', text: 'Setujui surat, agenda, dan kebijakan strategis tanpa hambatan.' },
      { title: 'Rapat pimpinan', text: 'Siapkan agenda dan materi rapat dari satu layar.' },
    ],
    alerts: [
      { title: 'Kehadiran naik 4.1%', text: 'Tren bulan ini positif dibanding periode sebelumnya.' },
      { title: '2 program prioritas', text: 'Perlu tindak lanjut untuk kelas unggulan dan literasi digital.' },
    ],
    metrics: [
      { value: '89.4', label: 'Skor mutu sekolah' },
      { value: '96.8%', label: 'Kehadiran rata-rata' },
      { value: '12', label: 'Dokumen menunggu persetujuan' },
      { value: '04', label: 'Program prioritas' },
    ],
    timeline: [
      { title: '08.15 - Briefing pimpinan', text: 'Tinjau indikator utama dan progres unit kerja.' },
      { title: '10.00 - Monitoring kelas', text: 'Bandingkan capaian kelas, guru, dan laporan supervisi.' },
      { title: '15.30 - Persetujuan kebijakan', text: 'Verifikasi surat dan rencana kegiatan sekolah.' },
    ],
  },
  {
    id: 'guru',
    label: 'Guru',
    title: 'Guru',
    badge: 'Pembelajaran',
    headline: 'Semua yang dibutuhkan guru untuk mengajar dan menilai dalam satu tempat',
    summary:
      'Mengelola jadwal, materi, presensi, nilai, refleksi pembelajaran, dan komunikasi dengan orang tua secara efisien.',
    actions: [
      { title: 'Input nilai', text: 'Rekap tugas, kuis, praktik, dan asesmen formatif.' },
      { title: 'Absensi kelas', text: 'Catat kehadiran harian langsung dari perangkat mobile.' },
      { title: 'Materi pembelajaran', text: 'Bagikan modul, video, dan tugas dengan tautan aman.' },
    ],
    alerts: [
      { title: '4 tugas belum dinilai', text: 'Mata pelajaran Matematika dan IPA perlu tindak lanjut.' },
      { title: 'Ruang kelas pindah', text: 'Jadwal jam ke-3 berpindah ke ruang multimedia.' },
    ],
    metrics: [
      { value: '8', label: 'Kelas aktif' },
      { value: '27', label: 'Tugas terkirim' },
      { value: '94%', label: 'Tingkat penyelesaian nilai' },
      { value: '16', label: 'Pesan orang tua' },
    ],
    timeline: [
      { title: '07.20 - Presensi kelas', text: 'Cek kehadiran dan status keterlambatan siswa.' },
      { title: '11.00 - Unggah materi', text: 'Publikasikan modul dan kuis untuk pertemuan berikutnya.' },
      { title: '14.15 - Konsultasi orang tua', text: 'Tindak lanjuti laporan perkembangan siswa.' },
    ],
  },
  {
    id: 'siswa',
    label: 'Siswa',
    title: 'Siswa',
    badge: 'Belajar Mandiri',
    headline: 'Portal belajar yang ringan untuk mengikuti progres akademik secara mandiri',
    summary:
      'Melihat jadwal, tugas, nilai, materi, absensi, dan pengumuman sekolah dengan tampilan yang mudah dipahami.',
    actions: [
      { title: 'Tugas harian', text: 'Lihat deadline, unggah jawaban, dan cek status penilaian.' },
      { title: 'Jadwal pelajaran', text: 'Akses jadwal kelas harian dan pengingat ujian.' },
      { title: 'Rapor sementara', text: 'Pantau perkembangan nilai per mapel secara berkala.' },
    ],
    alerts: [
      { title: '2 tugas jatuh tempo', text: 'Matematika dan Bahasa Inggris perlu diselesaikan hari ini.' },
      { title: 'Ulangan minggu depan', text: 'Persiapan untuk asesmen formatif kelas XI.' },
    ],
    metrics: [
      { value: '92%', label: 'Kehadiran bulan ini' },
      { value: '12', label: 'Tugas aktif' },
      { value: '86', label: 'Rata-rata nilai' },
      { value: '05', label: 'Pengumuman baru' },
    ],
    timeline: [
      { title: '06.45 - Cek jadwal', text: 'Pastikan mata pelajaran dan ruang kelas hari ini.' },
      { title: '13.00 - Kerjakan tugas', text: 'Kirim jawaban sebelum tenggat berakhir.' },
      { title: '18.30 - Review progres', text: 'Lihat performa minggu ini dan target berikutnya.' },
    ],
  },
  {
    id: 'orangtua',
    label: 'Orang Tua',
    title: 'Orang Tua',
    badge: 'Pemantauan',
    headline: 'Komunikasi yang transparan agar orang tua selalu terhubung dengan perkembangan anak',
    summary:
      'Memantau kehadiran, nilai, catatan wali kelas, tagihan, dan pengumuman penting tanpa perlu membuka banyak kanal.',
    actions: [
      { title: 'Pantau kehadiran', text: 'Lihat absensi dan keterlambatan anak setiap hari.' },
      { title: 'Pesan wali kelas', text: 'Kirim pertanyaan atau konfirmasi melalui kanal yang aman.' },
      { title: 'Tagihan sekolah', text: 'Cek status pembayaran dan riwayat administrasi.' },
    ],
    alerts: [
      { title: 'Absen 1 kali', text: 'Anak perlu konfirmasi alasan ketidakhadiran hari ini.' },
      { title: 'Rapat orang tua', text: 'Undangan pertemuan kelas tersedia di kalender.' },
    ],
    metrics: [
      { value: '95%', label: 'Kehadiran anak' },
      { value: '04', label: 'Pesan wali kelas' },
      { value: '02', label: 'Agenda mendatang' },
      { value: '100%', label: 'Status administrasi' },
    ],
    timeline: [
      { title: '07.00 - Notifikasi pagi', text: 'Terima ringkasan hadir dan catatan penting.' },
      { title: '16.00 - Rekap kegiatan', text: 'Baca update guru dan progres tugas.' },
      { title: '20.00 - Verifikasi tagihan', text: 'Periksa status administrasi dan pembayaran.' },
    ],
  },
  {
    id: 'calon',
    label: 'PPDB',
    title: 'Calon Peserta Didik',
    badge: 'Penerimaan Siswa Baru',
    headline: 'Alur pendaftaran yang jelas, cepat, dan mudah dipantau dari rumah',
    summary:
      'Menampilkan panduan daftar, dokumen, status seleksi, jadwal tes, pengumuman, dan layanan bantuan calon siswa.',
    actions: [
      { title: 'Daftar online', text: 'Isi formulir dan unggah dokumen dari perangkat apa pun.' },
      { title: 'Cek status', text: 'Pantau hasil seleksi, jadwal verifikasi, dan tahap berikutnya.' },
      { title: 'Tanya CS', text: 'Hubungi layanan informasi PPDB untuk bantuan cepat.' },
    ],
    alerts: [
      { title: 'Gelombang 1 dibuka', text: 'Pendaftaran aktif dan kuota kelas unggulan terbatas.' },
      { title: 'Dokumen wajib', text: 'Pastikan berkas rapor dan kartu keluarga telah diunggah.' },
    ],
    metrics: [
      { value: '1.120', label: 'Pendaftar' },
      { value: '86%', label: 'Terverifikasi' },
      { value: '04', label: 'Tahap seleksi' },
      { value: '12', label: 'Bantuan terkirim' },
    ],
    timeline: [
      { title: '08.00 - Buka pendaftaran', text: 'Formulir aktif dan siap diisi secara daring.' },
      { title: '13.00 - Verifikasi berkas', text: 'Tim admin memeriksa dokumen dan status kelengkapan.' },
      { title: '18.00 - Pengumuman tahap', text: 'Status seleksi dipublikasikan ke portal pendaftar.' },
    ],
  },
];

const schoolOverview = [
  { value: '2.400+', label: 'Warga sekolah terhubung' },
  { value: '6', label: 'Peran pengguna aktif' },
  { value: '99.9%', label: 'Target ketersediaan' },
  { value: '24/7', label: 'Akses portal' },
];

const trust = [
  {
    title: 'Akses berbasis peran',
    text: 'Setiap pengguna melihat data yang relevan saja, sehingga antarmuka tetap fokus dan aman.',
  },
  {
    title: 'Cepat diakses',
    text: 'Struktur ringan dan responsif, cocok untuk desktop, tablet, maupun ponsel.',
  },
  {
    title: 'Siap integrasi',
    text: 'Mudah disambungkan ke backend, notifikasi, pembayaran, dan sistem akademik lain.',
  },
];

const modules = [
  {
    icon: '📚',
    title: 'Akademik',
    text: 'Jadwal, nilai, absensi, rapor, materi, tugas, dan arsip pembelajaran.' ,
    tags: ['Kurikulum', 'Rapor', 'Kelas'],
  },
  {
    icon: '👥',
    title: 'Kesiswaan',
    text: 'Bimbingan konseling, disiplin, prestasi, organisasi, dan catatan perkembangan siswa.',
    tags: ['BK', 'Prestasi', 'Disiplin'],
  },
  {
    icon: '💬',
    title: 'Komunikasi',
    text: 'Pengumuman, pesan internal, notifikasi orang tua, dan kanal layanan publik.',
    tags: ['Notifikasi', 'Pesan', 'Pengumuman'],
  },
  {
    icon: '🧾',
    title: 'Administrasi',
    text: 'Surat menyurat, dokumen sekolah, data induk, dan audit aktivitas pengguna.',
    tags: ['Dokumen', 'Audit', 'Data'],
  },
  {
    icon: '💳',
    title: 'Keuangan',
    text: 'Tagihan, pembayaran, beasiswa, dan rekap administrasi yang mudah dipantau.',
    tags: ['Tagihan', 'Beasiswa', 'Pembayaran'],
  },
  {
    icon: '🚀',
    title: 'PPDB Online',
    text: 'Pendaftaran calon peserta didik, verifikasi berkas, dan pengumuman seleksi.',
    tags: ['Seleksi', 'Pendaftaran', 'Status'],
  },
];

const publicCardData = [
  {
    icon: '🧭',
    title: 'Panduan PPDB',
    text: 'Langkah daftar, persyaratan, jadwal seleksi, dan status penerimaan dalam satu halaman.' ,
  },
  {
    icon: '📅',
    title: 'Kalender Sekolah',
    text: 'Agenda ujian, libur, rapat, dan kegiatan sekolah yang mudah dipahami keluarga.' ,
  },
  {
    icon: '🛟',
    title: 'Pusat Bantuan',
    text: 'FAQ, kanal kontak, dan tiket layanan untuk orang tua maupun calon pendaftar.' ,
  },
];

const moduleIcons = ['📚', '🧾', '📣', '🛡️', '💬', '📊'];
const savedRole = localStorage.getItem('sis-role');
const initialRole = roles.some((role) => role.id === savedRole) ? savedRole : 'admin';
let activeRoleId = initialRole;

year.textContent = new Date().getFullYear();

function renderSchoolStats() {
  schoolStats.innerHTML = schoolOverview
    .map(
      (item) => `
        <article class="overview-card">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `,
    )
    .join('');
}

function renderTrustPoints() {
  trustPoints.innerHTML = trust
    .map(
      (item) => `
        <article class="trust-card">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `,
    )
    .join('');
}

function renderRoleTabs() {
  roleTabs.innerHTML = roles
    .map(
      (role) => `
        <button class="role-pill ${role.id === activeRoleId ? 'active' : ''}" data-role="${role.id}">
          ${role.label}
        </button>
      `,
    )
    .join('');

  roleTabs.querySelectorAll('[data-role]').forEach((button) => {
    button.addEventListener('click', () => {
      activeRoleId = button.dataset.role;
      localStorage.setItem('sis-role', activeRoleId);
      renderRoleTabs();
      renderRolePanel();
    });
  });
}

function renderRolePanel() {
  const role = roles.find((item) => item.id === activeRoleId) ?? roles[0];

  roleTitle.textContent = role.title;
  roleSummary.textContent = role.summary;
  roleHeadline.textContent = role.headline;
  roleBadge.textContent = role.badge;

  roleActions.innerHTML = role.actions
    .map(
      (item) => `
        <article class="action-card">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `,
    )
    .join('');

  roleAlerts.innerHTML = role.alerts
    .map(
      (item) => `
        <article class="alert-card">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `,
    )
    .join('');

  roleMetrics.innerHTML = role.metrics
    .map(
      (item) => `
        <article class="metric-card">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `,
    )
    .join('');

  roleTimeline.innerHTML = role.timeline
    .map(
      (item) => `
        <article class="timeline-item">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `,
    )
    .join('');

  integrationList.innerHTML = [
    {
      title: 'Dapodik & data induk',
      text: 'Sinkronisasi data dasar sekolah dan struktur kelas tetap konsisten.',
    },
    {
      title: 'Notifikasi pintar',
      text: 'Informasi penting dapat dikirim ke email, push, atau kanal pesan keluarga.',
    },
    {
      title: 'Audit & keamanan',
      text: 'Log akses membantu sekolah memantau perubahan dan menjaga kepatuhan.',
    },
  ]
    .map(
      (item) => `
        <article class="integration-item">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `,
    )
    .join('');
}

function renderModules() {
  moduleGrid.innerHTML = modules
    .map(
      (module, index) => `
        <article class="module-card">
          <div class="module-icon">${moduleIcons[index % moduleIcons.length]}</div>
          <h4>${module.title}</h4>
          <p>${module.text}</p>
          <div class="module-tags">
            ${module.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </article>
      `,
    )
    .join('');
}

function renderPublicServices() {
  publicServices.innerHTML = publicCardData
    .map(
      (item) => `
        <article class="public-card">
          <div class="module-icon">${item.icon}</div>
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join('');
}

renderSchoolStats();
renderTrustPoints();
renderRoleTabs();
renderRolePanel();
renderModules();
renderPublicServices();
