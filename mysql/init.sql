CREATE DATABASE IF NOT EXISTS sis_db;
USE sis_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','kepsek','guru','siswa','orangtua','ppdb') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS school_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  metric_key VARCHAR(80) NOT NULL UNIQUE,
  metric_value VARCHAR(120) NOT NULL,
  metric_label VARCHAR(160) NOT NULL
);

INSERT INTO school_metrics (metric_key, metric_value, metric_label)
VALUES
  ('students', '1.842', 'Data siswa aktif'),
  ('uptime', '99.9%', 'Target ketersediaan'),
  ('roles', '6', 'Peran pengguna aktif')
ON DUPLICATE KEY UPDATE metric_value = VALUES(metric_value), metric_label = VALUES(metric_label);
