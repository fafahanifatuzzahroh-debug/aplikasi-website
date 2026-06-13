# SIS Terintegrasi SMA Negeri

Aplikasi website Sistem Informasi Sekolah terintegrasi untuk SMA Negeri dengan stack full-stack modern: frontend React.js + Bootstrap 5, backend Node.js + Express.js, database MySQL, autentikasi JWT, RBAC, dan deployment via Docker, Nginx, serta VPS Linux.

## Stack

- Frontend: HTML5, CSS3, JavaScript ES6, Bootstrap 5, React.js
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT Authentication, Role Based Access Control (RBAC)
- Deployment: Docker, Nginx, VPS Linux

## Struktur Project

- [frontend/](frontend/) - aplikasi React yang menjadi antarmuka utama.
- [backend/](backend/) - API Express dengan JWT dan RBAC.
- [mysql/init.sql](mysql/init.sql) - skema awal database MySQL.
- [docker-compose.yml](docker-compose.yml) - orkestrasi layanan untuk development dan deployment.
- [nginx/nginx.conf](nginx/nginx.conf) - konfigurasi reverse proxy.

## Cara Menjalankan

1. Salin [`.env.example`](.env.example) menjadi `.env` dan sesuaikan kredensial.
2. Jalankan `npm install` di root, lalu `npm install` pada folder `frontend` dan `backend` jika diperlukan.
3. Untuk development, gunakan `npm run dev` dari root.
4. Untuk deployment dengan Docker, jalankan `docker compose up --build`.

## Akun Demo

- `superadmin@sma.sch.id` / `password123`
- `admin@sma.sch.id` / `password123`
- `kepsek@sma.sch.id` / `password123`

## Role Pengguna

- Super Admin: kelola pengguna, sekolah, database, backup, hak akses, dan monitoring aktivitas.
- Admin Sekolah: kelola siswa, guru, kelas, mata pelajaran, jadwal, PPDB, keuangan, berita, pengumuman, dan dokumen.
- Kepala Sekolah: dashboard laporan, monitoring guru, siswa, absensi, nilai, dan cetak laporan.
- Guru: input nilai, absensi, tugas, materi, jurnal mengajar, catatan siswa, dan cetak rapor.
- Siswa: dashboard siswa, profil, nilai, jadwal, tugas, materi, absensi, pengumuman, dan rapor digital.
- Orang Tua: monitoring nilai anak, absensi, pembayaran, dan pengumuman sekolah.
- Calon Siswa: pendaftaran online, upload dokumen, cetak formulir, dan status seleksi.

## Catatan

Prototype statis lama masih tersedia di root repo, tetapi implementasi utama sekarang berada di folder `frontend/` dan `backend/`.