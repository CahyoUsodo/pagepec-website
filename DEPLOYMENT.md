# Panduan Deploy Website ke Vercel - Untuk Pemula

Panduan lengkap step-by-step untuk mengupload website Anda ke internet agar bisa diakses oleh semua orang.

## 📋 Daftar Yang Perlu Disiapkan

Sebelum mulai, pastikan Anda sudah punya:
- ✅ Akun GitHub (gratis) - untuk menyimpan kode program
- ✅ Akun Vercel (gratis) - untuk hosting website
- ✅ Akun Supabase (gratis) - untuk database
- ✅ Akun Cloudinary (gratis) - untuk menyimpan gambar/video
- ✅ Akun OpenAI (berbayar, tapi ada free trial) - untuk chatbot AI

---

## 🚀 LANGKAH 1: Persiapan Kode Program

### 1.1. Buat File .env (Jika Belum Ada)

Di folder project Anda (`PagePEC`), buat file baru bernama `.env` (tanpa ekstensi apapun).

**Cara membuat:**
1. Buka folder `PagePEC` di Windows Explorer
2. Klik kanan → New → Text Document
3. Rename menjadi `.env` (hapus ekstensi .txt)
4. Windows akan tanya "Are you sure?", klik Yes

**Isi file `.env` dengan template ini (isi nanti setelah setup):**
```
DATABASE_URL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Catatan:** Jangan commit file `.env` ke GitHub (sudah ada di .gitignore).

---

## 🗄️ LANGKAH 2: Setup Database (Supabase)

### 2.1. Buat Akun Supabase

1. Buka browser, kunjungi: https://supabase.com
2. Klik **"Start your project"** atau **"Sign Up"**
3. Pilih **"Continue with GitHub"** (paling mudah)
4. Ikuti instruksi untuk membuat akun

### 2.2. Buat Project Baru

1. Setelah login, klik **"New Project"**
2. Isi informasi:
   - **Name:** `pagepec-db` (atau nama lain)
   - **Database Password:** Buat password yang kuat (simpan baik-baik!)
   - **Region:** Pilih yang terdekat (Singapore untuk Indonesia)
3. Klik **"Create new project"**
4. Tunggu 2-3 menit sampai project selesai dibuat

### 2.3. Ambil Connection String

1. Di dashboard Supabase, klik **"Settings"** (ikon gear di sidebar kiri)
2. Klik **"Database"**
3. Scroll ke bawah, cari bagian **"Connection string"**
4. Pilih tab **"URI"**
5. Copy connection string yang muncul (format: `postgresql://postgres:[YOUR-PASSWORD]@...`)
6. **PENTING:** Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat tadi
7. Copy string lengkapnya

**Contoh hasil:**
```
postgresql://postgres.xxxxx:password123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### 2.4. Update File .env

Buka file `.env` di project Anda, isi `DATABASE_URL`:
```
DATABASE_URL="postgresql://postgres.xxxxx:password123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

---

## ☁️ LANGKAH 3: Setup Cloudinary (Untuk Media Storage)

### 3.1. Buat Akun Cloudinary

1. Kunjungi: https://cloudinary.com
2. Klik **"Sign Up For Free"**
3. Isi form pendaftaran
4. Verifikasi email Anda

### 3.2. Ambil Credentials

1. Setelah login, Anda akan masuk ke **Dashboard**
2. Di bagian **"Account Details"**, Anda akan lihat:
   - **Cloud name**
   - **API Key**
   - **API Secret**
3. Copy ketiga informasi ini

### 3.3. Update File .env

Tambahkan ke file `.env`:
```
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz"
```

---

## 🤖 LANGKAH 4: Setup OpenAI (Untuk Chatbot)

### 4.1. Buat Akun OpenAI

1. Kunjungi: https://platform.openai.com
2. Klik **"Sign Up"**
3. Buat akun (perlu kartu kredit untuk free trial, tapi tidak akan ditagih jika tidak melebihi limit)
4. Verifikasi email dan nomor telepon

### 4.2. Buat API Key

1. Setelah login, klik **"API"** di menu atas
2. Klik **"API keys"** di sidebar kiri
3. Klik **"Create new secret key"**
4. Beri nama: `PagePEC Chatbot`
5. Copy API key yang muncul (hanya muncul sekali, simpan baik-baik!)

**Format API key:** `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 4.3. Update File .env

Tambahkan:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 🔐 LANGKAH 5: Generate NEXTAUTH_SECRET

### 5.1. Generate Secret Key

Buka **Command Prompt** atau **PowerShell** di Windows:

1. Tekan `Windows + R`
2. Ketik `cmd` atau `powershell`, tekan Enter
3. Ketik perintah ini:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

4. Copy hasil yang muncul (string panjang)

### 5.2. Update File .env

Tambahkan:
```
NEXTAUTH_SECRET="hasil-dari-perintah-di-atas"
```

---

## 📦 LANGKAH 6: Push Code ke GitHub

### 6.1. Install Git (Jika Belum Ada)

1. Download Git: https://git-scm.com/download/win
2. Install dengan default settings
3. Restart komputer jika diminta

### 6.2. Buat Repository di GitHub

1. Kunjungi: https://github.com
2. Login atau buat akun baru
3. Klik **"+"** di pojok kanan atas → **"New repository"**
4. Isi:
   - **Repository name:** `pagepec-website`
   - **Description:** `Website Lembaga Pendidikan dengan CMS dan Chatbot AI`
   - **Visibility:** Pilih **Public** (gratis) atau **Private**
5. JANGAN centang "Initialize with README"
6. Klik **"Create repository"**

### 6.3. Upload Code ke GitHub

Buka **Command Prompt** atau **PowerShell**, lalu:

1. Masuk ke folder project:
```bash
cd C:\xampp\htdocs\PagePEC
```

2. Inisialisasi Git:
```bash
git init
```

3. Tambahkan semua file:
```bash
git add .
```

4. Commit pertama:
```bash
git commit -m "Initial commit - Website PEC dengan CMS dan Chatbot"
```

5. Tambahkan remote GitHub (ganti `username` dengan username GitHub Anda):
```bash
git remote add origin https://github.com/username/pagepec-website.git
```

6. Push ke GitHub:
```bash
git branch -M main
git push -u origin main
```

7. Jika diminta login, masukkan username dan password GitHub Anda
   - **Catatan:** Jika password tidak bekerja, gunakan **Personal Access Token** (lihat di bawah)

**Cara membuat Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Beri nama: `PagePEC Deploy`
4. Centang: `repo` (full control)
5. Generate token
6. Copy token (hanya muncul sekali!)
7. Gunakan token ini sebagai password saat push

---

## 🚀 LANGKAH 7: Deploy ke Vercel

### 7.1. Buat Akun Vercel

1. Kunjungi: https://vercel.com
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"** (paling mudah)
4. Authorize Vercel untuk akses GitHub

### 7.2. Import Project

1. Setelah login, klik **"Add New..."** → **"Project"**
2. Pilih repository `pagepec-website` yang baru dibuat
3. Klik **"Import"**

### 7.3. Konfigurasi Project

1. **Framework Preset:** Otomatis terdeteksi "Next.js" (biarkan)
2. **Root Directory:** Biarkan kosong (default: `./`)
3. **Build Command:** Biarkan default
4. **Output Directory:** Biarkan default
5. **Install Command:** Biarkan default

### 7.4. Setup Environment Variables

Di bagian **"Environment Variables"**, tambahkan satu per satu:

1. **DATABASE_URL**
   - Key: `DATABASE_URL`
   - Value: (paste connection string dari Supabase)
   - Environment: Pilih semua (Production, Preview, Development)

2. **NEXTAUTH_SECRET**
   - Key: `NEXTAUTH_SECRET`
   - Value: (paste secret yang sudah di-generate)
   - Environment: Semua

3. **NEXTAUTH_URL**
   - Key: `NEXTAUTH_URL`
   - Value: `https://your-project-name.vercel.app` (akan muncul setelah deploy)
   - Environment: Semua

4. **OPENAI_API_KEY**
   - Key: `OPENAI_API_KEY`
   - Value: (paste API key dari OpenAI)
   - Environment: Semua

5. **CLOUDINARY_CLOUD_NAME**
   - Key: `CLOUDINARY_CLOUD_NAME`
   - Value: (paste cloud name dari Cloudinary)
   - Environment: Semua

6. **CLOUDINARY_API_KEY**
   - Key: `CLOUDINARY_API_KEY`
   - Value: (paste API key dari Cloudinary)
   - Environment: Semua

7. **CLOUDINARY_API_SECRET**
   - Key: `CLOUDINARY_API_SECRET`
   - Value: (paste API secret dari Cloudinary)
   - Environment: Semua

8. **NEXT_PUBLIC_BASE_URL**
   - Key: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://your-project-name.vercel.app` (sama dengan NEXTAUTH_URL)
   - Environment: Semua

**Catatan:** URL `your-project-name.vercel.app` akan muncul setelah deploy pertama. Anda bisa update lagi nanti.

### 7.5. Deploy!

1. Setelah semua environment variables diisi, klik **"Deploy"**
2. Tunggu 2-5 menit untuk proses build dan deploy
3. Setelah selesai, klik **"Visit"** untuk melihat website Anda!

---

## 🗄️ LANGKAH 8: Setup Database Schema

Setelah website sudah online, kita perlu setup database schema.

### 8.1. Update NEXTAUTH_URL dan NEXT_PUBLIC_BASE_URL

1. Di Vercel dashboard, klik project Anda
2. Klik **"Settings"** → **"Environment Variables"**
3. Update `NEXTAUTH_URL` dan `NEXT_PUBLIC_BASE_URL` dengan URL website Anda yang sebenarnya
   - Contoh: `https://pagepec-website.vercel.app`

### 8.2. Setup Database Schema

Ada 2 cara:

**Cara 1: Via Vercel (Recommended)**

1. Di Vercel dashboard, klik project → **"Deployments"**
2. Klik deployment terbaru → **"Functions"** tab
3. Atau gunakan Vercel CLI (lihat cara 2)

**Cara 2: Via Local (Lebih Mudah)**

1. Di komputer lokal, pastikan file `.env` sudah diisi dengan benar
2. Buka Command Prompt di folder project
3. Jalankan:
```bash
npm install
npm run db:generate
npm run db:push
```

Ini akan membuat semua tabel di database Supabase.

### 8.3. Buat Admin User

Masih di Command Prompt lokal:
```bash
npm run create-admin
```

Atau buat manual dengan format:
```bash
npm run create-admin email@example.com password123 Nama Admin
```

---

## ✅ LANGKAH 9: Testing Website

### 9.1. Test Halaman Public

1. Buka URL website Anda: `https://your-project-name.vercel.app`
2. Cek apakah:
   - ✅ Homepage muncul dengan benar
   - ✅ Logo muncul di navbar
   - ✅ Warna orange terlihat
   - ✅ Menu navigasi bekerja
   - ✅ Chatbot widget muncul (tombol chat di pojok kanan bawah)

### 9.2. Test Admin Panel

1. Buka: `https://your-project-name.vercel.app/admin/login`
2. Login dengan email dan password admin yang sudah dibuat
3. Cek apakah:
   - ✅ Bisa login
   - ✅ Dashboard muncul
   - ✅ Bisa akses semua menu (Konten, Media, Artikel, FAQ)

### 9.3. Test Upload Media

1. Di admin panel, masuk ke **"Kelola Media"**
2. Coba upload gambar atau video
3. Cek apakah:
   - ✅ Upload berhasil
   - ✅ Media muncul di galeri
   - ✅ Media bisa dilihat di halaman public `/galeri`

### 9.4. Test Chatbot

1. Di halaman public, klik tombol chat (pojok kanan bawah)
2. Coba tanya sesuatu
3. Cek apakah:
   - ✅ Chatbot merespons
   - ✅ Jawaban relevan

---

## 🔧 Troubleshooting (Masalah Umum)

### Website Error "Database Connection Failed"

**Solusi:**
1. Cek `DATABASE_URL` di Vercel environment variables
2. Pastikan password di connection string benar
3. Pastikan database Supabase masih aktif

### Logo Tidak Muncul

**Solusi:**
1. Pastikan file `logo.png` ada di folder `public/`
2. Pastikan file sudah di-commit ke GitHub
3. Cek nama file harus persis `logo.png` (case-sensitive)

### Chatbot Tidak Bekerja

**Solusi:**
1. Cek `OPENAI_API_KEY` di Vercel environment variables
2. Pastikan API key masih valid
3. Cek apakah ada credit di akun OpenAI

### Upload Media Gagal

**Solusi:**
1. Cek semua credentials Cloudinary di Vercel
2. Pastikan akun Cloudinary masih aktif
3. Cek apakah masih ada quota storage

### Admin Tidak Bisa Login

**Solusi:**
1. Pastikan sudah membuat admin user (langkah 8.3)
2. Cek email dan password yang digunakan
3. Pastikan `NEXTAUTH_SECRET` sudah di-set di Vercel

---

## 📝 Catatan Penting

1. **Environment Variables:** Setiap kali update environment variables di Vercel, website akan otomatis re-deploy

2. **Database Changes:** Jika mengubah schema Prisma, jalankan `npm run db:push` lagi

3. **Update Code:** Setiap kali push ke GitHub, Vercel akan otomatis deploy ulang

4. **Custom Domain:** Bisa tambahkan domain sendiri di Vercel Settings → Domains

5. **Backup:** Selalu backup:
   - Database (Supabase → Settings → Database → Backups)
   - Environment variables (simpan di tempat aman)
   - Code (sudah otomatis di GitHub)

---

## 🎉 Selesai!

Website Anda sekarang sudah online dan bisa diakses oleh semua orang!

**URL Website:** `https://your-project-name.vercel.app`
**Admin Panel:** `https://your-project-name.vercel.app/admin/login`

Jika ada pertanyaan atau masalah, cek bagian Troubleshooting di atas atau buka issue di GitHub repository Anda.

