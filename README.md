# PagePEC - Website Lembaga Pendidikan dengan CMS dan Chatbot AI

Website informasi untuk lembaga pendidikan bahasa Inggris dengan fitur CMS untuk mengelola konten dan chatbot AI untuk menjawab pertanyaan pengunjung.

## Fitur

- ✅ **Frontend Website** - Landing page, halaman tentang kami, program, dan galeri
- ✅ **Admin CMS Panel** - Dashboard untuk mengelola konten, media, artikel, dan FAQ
- ✅ **Media Management** - Upload gambar dan video (mendukung portrait & landscape) dengan Cloudinary
- ✅ **Chatbot AI** - Integrasi OpenAI API dengan fallback ke FAQ database
- ✅ **SEO Optimization** - Meta tags, sitemap, structured data (JSON-LD)
- ✅ **Authentication** - NextAuth.js untuk admin panel
- ✅ **Responsive Design** - Mobile-first design dengan Tailwind CSS

## Tech Stack

- **Next.js 14** (App Router) - Framework React dengan SSR/SSG
- **TypeScript** - Type safety
- **Prisma ORM** - Database management
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **OpenAI API** - Chatbot AI
- **Cloudinary** - Media storage
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI Components

## Setup & Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd PagePEC
```

### 2. Install Dependencies

```bash
npm install
```

### 2.5. Setup Logo

Letakkan file logo Anda di folder `public/` dengan nama `logo.png`:

```
public/
  └── logo.png
```

**Catatan:**
- Format yang didukung: PNG, JPG, SVG
- Ukuran yang disarankan: minimal 200x200px untuk kualitas baik
- Nama file harus: `logo.png` (atau ubah di `components/public/navbar.tsx` dan `components/public/footer.tsx` jika menggunakan nama lain)
- Logo akan otomatis muncul di navbar dan footer

### 3. Setup Environment Variables

Copy `.env.example` ke `.env` dan isi dengan nilai yang sesuai:

```bash
cp .env.example .env
```

Isi variabel berikut:
- `DATABASE_URL` - Connection string PostgreSQL (dari Supabase/Railway)
- `NEXTAUTH_SECRET` - Generate dengan: `openssl rand -base64 32`
- `NEXTAUTH_URL` - URL aplikasi (http://localhost:3000 untuk development)
- `OPENAI_API_KEY` - API key dari OpenAI
- `CLOUDINARY_CLOUD_NAME` - Cloud name dari Cloudinary
- `CLOUDINARY_API_KEY` - API key dari Cloudinary
- `CLOUDINARY_API_SECRET` - API secret dari Cloudinary
- `NEXT_PUBLIC_BASE_URL` - Base URL untuk SEO (https://yourdomain.com untuk production)

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push
```

### 5. Create Admin User

Setelah database setup, buat user admin pertama melalui Prisma Studio atau langsung di database:

```bash
npm run db:studio
```

Atau jalankan script untuk membuat user admin (buat file `scripts/create-admin.ts`):

```typescript
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  
  console.log("Admin user created!");
}

main();
```

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deployment

### Panduan Lengkap Deploy ke Vercel

Untuk panduan step-by-step yang sangat detail (cocok untuk pemula), silakan baca file **[DEPLOYMENT.md](DEPLOYMENT.md)**.

**Quick Start:**
1. Push code ke GitHub/GitLab
2. Import project di Vercel
3. Tambahkan environment variables di Vercel dashboard
4. Deploy

### Database Setup (Supabase)

1. Buat project di [Supabase](https://supabase.com)
2. Copy connection string dari Settings > Database
3. Update `DATABASE_URL` di environment variables

### Cloudinary Setup

1. Buat akun di [Cloudinary](https://cloudinary.com)
2. Copy Cloud Name, API Key, dan API Secret
3. Update environment variables

### OpenAI Setup

1. Buat akun di [OpenAI](https://platform.openai.com)
2. Generate API key
3. Update `OPENAI_API_KEY` di environment variables

## Struktur Project

```
PagePEC/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (admin)/           # Admin routes (protected)
│   └── api/               # API routes
├── components/
│   ├── ui/                # UI components (shadcn/ui)
│   ├── admin/             # Admin components
│   ├── public/            # Public components
│   └── chatbot/           # Chatbot components
├── lib/                   # Utilities & configs
├── prisma/                # Prisma schema
└── public/                # Static files
```

## Usage

### Admin Panel

1. Akses `/admin/login`
2. Login dengan email dan password admin
3. Dashboard tersedia untuk:
   - Kelola konten (informasi lembaga, program)
   - Upload media (gambar/video)
   - Kelola artikel/blog
   - Kelola FAQ untuk chatbot

### Upload Media

- Admin bisa upload gambar dan video melalui `/admin/media`
- Format portrait dan landscape didukung
- Video dari WhatsApp (terkompres) akan di-optimize oleh Cloudinary
- Media disimpan di Cloudinary dan metadata di database

### Chatbot

- Chatbot widget muncul di setiap halaman public
- Menggunakan OpenAI API untuk jawaban natural
- Fallback ke FAQ database jika AI tidak tersedia
- Context-aware berdasarkan informasi lembaga

## SEO Features

- ✅ Dynamic meta tags per halaman
- ✅ Sitemap.xml otomatis
- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags
- ✅ Robots.txt
- ✅ Optimized images dengan Next.js Image

## Biaya Estimasi

**Free Tier (Awal):**
- Vercel: Gratis
- Supabase: Gratis (500MB)
- Cloudinary: Gratis (25GB)
- OpenAI: Pay-as-you-go (~$0.002 per 1K tokens)

**Setelah Berkembang:**
- Vercel Pro: ~$20/bulan
- Supabase Pro: ~$25/bulan
- Cloudinary: ~$99/bulan (100GB)
- **Total: ~Rp 200-500rb/bulan**

## Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

## License

MIT

