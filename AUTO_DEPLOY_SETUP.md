# Panduan Setup Auto-Deploy Vercel dari GitHub

Panduan lengkap untuk memastikan Vercel otomatis deploy setiap kali Anda push code ke GitHub.

---

## ✅ Cara Memastikan Auto-Deploy Sudah Aktif

### 1. Cek GitHub Integration di Vercel

1. Buka **Vercel Dashboard**: https://vercel.com
2. Klik **"Settings"** (ikon gear) di sidebar kiri
3. Klik **"Git"** di menu settings
4. Pastikan Anda melihat:
   - ✅ **GitHub** terhubung (ada tombol "Disconnect" berarti sudah terhubung)
   - ✅ Repository `pagepec-website` muncul di daftar

**Jika GitHub belum terhubung:**
1. Klik **"Connect Git Provider"**
2. Pilih **"GitHub"**
3. Authorize Vercel untuk akses GitHub
4. Pilih repository `pagepec-website`
5. Klik **"Import"**

---

### 2. Cek Project Settings

1. Di Vercel dashboard, pilih project **`pagepec-website`**
2. Klik **"Settings"** → **"Git"**
3. Pastikan:
   - ✅ **GitHub Repository:** Terhubung (lihat "Connected X ago")
   - ✅ **deployment_status Events:** Enabled (toggle biru)
   - ✅ **repository_dispatch Events:** Enabled (toggle biru)

**Catatan Penting:**
- Di Vercel versi baru, **Auto-deploy sudah aktif secara default** ketika repository GitHub terhubung
- Tidak ada toggle "Auto-deploy" terpisah karena itu adalah behavior default
- Jika repository terhubung, setiap push ke branch `main` akan otomatis trigger deployment

### 2.1. Cek Production Branch

1. Klik **"Settings"** → **"Build and Deployment Settings"**
2. Scroll ke bagian **"Production Branch"**
3. Pastikan branch adalah **`main`** (atau `master`)
4. Jika berbeda, ubah ke `main` dan klik **"Save"**

---

### 3. Cek Webhook GitHub

1. Buka **GitHub**: https://github.com
2. Masuk ke repository **`pagepec-website`**
3. Klik **"Settings"** (di repository, bukan akun)
4. Klik **"Webhooks"** di sidebar kiri
5. Pastikan ada webhook dari Vercel:
   - ✅ URL: `https://api.vercel.com/v1/integrations/deploy/...`
   - ✅ Status: Active (hijau)
   - ✅ Events: `push` (tercentang)

**Jika webhook tidak ada:**
- Vercel akan otomatis membuat webhook saat pertama kali import project
- Jika tidak ada, coba disconnect dan reconnect GitHub di Vercel

---

## 🔧 Cara Enable Auto-Deploy (Jika Belum Aktif)

### Metode 1: Verifikasi Auto-Deploy (Vercel Versi Baru)

**PENTING:** Di Vercel versi terbaru, auto-deploy sudah aktif secara default ketika repository GitHub terhubung. Tidak ada toggle "Auto-deploy" terpisah.

1. **Buka Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Pilih Project**
   - Klik project **`pagepec-website`**

3. **Cek Git Settings**
   - Klik **"Settings"** → **"Git"**
   - Pastikan repository terhubung: "Connected X ago"
   - Pastikan **"deployment_status Events"** dan **"repository_dispatch Events"** Enabled (toggle biru)

4. **Cek Production Branch**
   - Klik **"Settings"** → **"Build and Deployment Settings"**
   - Scroll ke **"Production Branch"**
   - Pastikan adalah **`main`** (bukan branch lain)

5. **Test dengan Push**
   - Push commit baru ke GitHub
   - Cek tab **"Deployments"** di Vercel
   - Deployment baru harus muncul otomatis dalam 10-30 detik

---

### Metode 2: Reconnect GitHub (Jika Masih Tidak Bekerja)

1. **Disconnect GitHub**
   - Vercel Dashboard → Settings → Git
   - Klik **"Disconnect"** di GitHub integration

2. **Reconnect GitHub**
   - Klik **"Connect Git Provider"**
   - Pilih **"GitHub"**
   - Authorize Vercel
   - Pilih repository `pagepec-website`
   - Klik **"Import"**

3. **Pastikan Auto-Deploy Aktif**
   - Di halaman import, pastikan **"Auto-deploy"** tercentang
   - Klik **"Deploy"**

---

## 🧪 Cara Test Auto-Deploy

### Test 1: Push Commit Baru

1. **Buat perubahan kecil** di file lokal:
   ```bash
   # Buka file README.md
   # Tambahkan baris kosong atau komentar
   ```

2. **Commit dan Push:**
   ```bash
   cd C:\xampp\htdocs\PagePEC
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```

3. **Cek Vercel Dashboard:**
   - Buka: https://vercel.com/dashboard
   - Pilih project `pagepec-website`
   - Lihat tab **"Deployments"**
   - **Harus muncul deployment baru** dalam 10-30 detik setelah push
   - Status akan berubah dari "Building" → "Ready"

### Test 2: Cek Deployment Logs

1. Setelah push, buka deployment terbaru di Vercel
2. Cek **"Source"**:
   - Harus menunjukkan commit terbaru yang Anda push
   - Harus menunjukkan branch `main`
3. Cek **"Build Logs"**:
   - Harus menunjukkan proses build dimulai otomatis
   - Tidak perlu trigger manual

---

## 🚨 Troubleshooting: Auto-Deploy Tidak Bekerja

### Masalah 1: Push ke GitHub Tapi Vercel Tidak Deploy

**Solusi:**
1. Cek apakah branch yang di-push adalah `main` (bukan branch lain)
2. Cek Vercel Settings → Git → Production Branch (harus `main`)
3. Cek GitHub webhook status (harus Active)
4. Coba push lagi dengan commit baru

### Masalah 2: Webhook GitHub Tidak Aktif

**Solusi:**
1. GitHub → Repository Settings → Webhooks
2. Jika webhook Vercel tidak ada atau error:
   - Vercel Dashboard → Settings → Git
   - Disconnect GitHub
   - Reconnect GitHub
   - Vercel akan otomatis membuat webhook baru

### Masalah 3: Auto-Deploy Toggle Tidak Bisa Diaktifkan

**Solusi:**
1. Pastikan GitHub sudah terhubung dengan benar
2. Pastikan repository sudah di-import ke Vercel
3. Coba refresh halaman Vercel
4. Jika masih tidak bisa, coba reconnect GitHub

### Masalah 4: Deploy Manual Berhasil, Tapi Auto-Deploy Tidak

**Solusi:**
1. Cek apakah branch yang di-push sesuai dengan Production Branch di Vercel
2. Cek GitHub webhook events (harus include `push`)
3. Cek Vercel logs untuk error webhook
4. Coba disconnect dan reconnect GitHub

---

## 📋 Checklist Auto-Deploy

Gunakan checklist ini untuk memastikan semuanya sudah benar:

- [ ] GitHub terhubung di Vercel Settings → Git (lihat "Connected X ago")
- [ ] Repository `CahyoUsodo/pagepec-website` terhubung
- [ ] **deployment_status Events** Enabled (toggle biru)
- [ ] **repository_dispatch Events** Enabled (toggle biru)
- [ ] Production Branch adalah `main` (cek di Build and Deployment Settings)
- [ ] Webhook GitHub aktif (di GitHub Settings → Webhooks)
- [ ] Test push berhasil trigger deployment baru

---

## 💡 Tips & Best Practices

1. **Selalu Push ke Branch `main`**
   - Vercel hanya auto-deploy dari Production Branch (default: `main`)
   - Push ke branch lain tidak akan trigger auto-deploy

2. **Monitor Deployments**
   - Cek Vercel dashboard setelah push untuk memastikan deployment dimulai
   - Jika tidak muncul dalam 1 menit, ada masalah dengan webhook

3. **Gunakan Commit Messages yang Jelas**
   - Setiap commit akan muncul di Vercel deployment
   - Gunakan message yang deskriptif untuk tracking

4. **Jangan Push File Besar**
   - File besar (>100MB) bisa menyebabkan deployment lambat atau gagal
   - Gunakan Git LFS untuk file besar, atau upload ke Cloudinary

5. **Cek Build Logs**
   - Setiap deployment punya build logs
   - Cek logs jika deployment gagal untuk debugging

---

## 🎯 Quick Reference

**Cek Auto-Deploy Status:**
```
Vercel Dashboard → Project → Settings → Git
- Repository harus terhubung: "Connected X ago"
- deployment_status Events: Enabled (biru)
- repository_dispatch Events: Enabled (biru)

Vercel Dashboard → Project → Settings → Build and Deployment Settings
- Production Branch: main
```

**Cek GitHub Webhook:**
```
GitHub → Repository → Settings → Webhooks → Vercel webhook (Active)
```

**Test Auto-Deploy:**
```bash
git add .
git commit -m "Test auto-deploy"
git push origin main
# Cek Vercel dashboard dalam 30 detik
```

---

## ✅ Setelah Setup

Setelah memastikan auto-deploy aktif, setiap kali Anda:

1. **Push code ke GitHub** → Vercel otomatis deploy
2. **Merge Pull Request** → Vercel otomatis deploy
3. **Update code lokal** → Push → Vercel otomatis deploy

**Tidak perlu lagi:**
- ❌ Klik "Deploy" manual di Vercel
- ❌ Trigger deployment manual
- ❌ Redeploy dari dashboard

**Website akan otomatis update** setiap kali ada perubahan di GitHub! 🚀

