# ThriftLab

Landing page untuk **ThriftLab** — archive pakaian second-hand kurasi, dibuat untuk audiens Gen Z dengan visual editorial/streetwear: tipografi besar, whitespace, dan interaksi halus lewat GSAP.

![status](https://img.shields.io/badge/status-in--development-orange)
![stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Tailwind%20v4%20%7C%20GSAP-black)

---

## Tentang Project

ThriftLab adalah landing page single-page untuk brand thrift fashion, menampilkan:

- **Page loader** dengan transisi GSAP saat pertama kali masuk
- **Hero** dengan text/image reveal
- **Latest Finds** — produk unggulan dengan filter kategori, diambil dari API backend
- **Categories** — navigasi kategori thrift (Flannel, Denim, Hoodie, dst.)
- **About** — value proposition ThriftLab (sustainable, satu-satunya, bukan fast fashion)
- **CTA Section** sebelum footer
- **Footer** dengan navigasi & kontak

Setiap section dianimasikan menggunakan GSAP + ScrollTrigger, dengan animasi yang menghormati `prefers-reduced-motion`.

---

## Tech Stack

| Layer       | Teknologi                          |
|-------------|-------------------------------------|
| Framework   | Next.js (App Router)                |
| Styling     | Tailwind CSS v4 (`@theme` tokens)   |
| Animasi     | GSAP + ScrollTrigger                |
| Icon        | lucide-react                        |
| Bahasa      | TypeScript                          |

---

## Struktur Project

```
.
├── app/
│   ├── globals.css       # design tokens (warna, font) via @theme
│   ├── layout.tsx        # root layout
│   ├── page.tsx          # entry point landing page
│   └── favicon.ico
│
└── components/
    ├── PageLoader.tsx        # loader animasi awal
    ├── Navbar.tsx             # navigasi + mobile menu
    ├── Hero.tsx               # hero section
    ├── Marquee.tsx            # running text/marquee
    ├── FeaturedProducts.tsx   # grid produk + filter kategori (fetch dari API)
    ├── Categories.tsx         # section kategori
    ├── Showcase.tsx           # showcase visual tambahan
    ├── About.tsx              # value proposition ThriftLab
    ├── CTA.tsx                # call-to-action sebelum footer
    └── Footer.tsx             # footer
```

---

## Getting Started

### Prasyarat

- Node.js `>= 18`
- Backend ThriftLab berjalan di `http://localhost:3001` (menyediakan endpoint `/api/products`) — landing page mengambil data produk dari sini.

### Instalasi

```bash
# clone repository
git clone <repo-url>
cd thriftlab

# install dependency
npm install
```

### Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Ganti sesuai alamat backend kamu jika berbeda.

### Menjalankan secara lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk production

```bash
npm run build
npm run start
```

---

## Git Workflow

Project ini mengikuti branching model berikut:

| Branch       | Fungsi                                                        |
|--------------|-----------------------------------------------------------------|
| `main`       | Versi stabil/final produk. **Hanya PM yang boleh merge ke sini.** |
| `develop`    | Branch pengembangan utama, tempat semua fitur digabungkan.     |
| `feature/*`  | Satu branch untuk satu fitur/tugas, dibuat dari `develop`.      |

**Aturan:**

1. Semua development dilakukan di branch `feature/*`, dibuat dari `develop` — jangan pernah langsung develop di `main`.
2. Commit message wajib mengikuti [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   feat: menambahkan fitur pencarian produk
   fix: memperbaiki bug pada validasi form
   style: merapikan tampilan navbar
   docs: memperbarui README.md
   refactor: menyederhanakan fungsi hitung total
   ```

3. Setelah fitur selesai dan teruji, merge `feature/*` ke `develop`:

   ```bash
   git checkout develop
   git pull
   git merge --no-ff feature/nama-fitur
   git push origin develop
   ```

4. Merge ke `main` hanya dilakukan oleh PM setelah `develop` dianggap stabil untuk rilis.

---

## Team

| Nama        | Peran                     |
|-------------|-----------------------------|
| Naufal      | Project Manager             |
| Haidar      | Frontend & Backend Developer |
| Hervansyah  | Quality Assurance (QA)      |
| Syafiq      | UI/UX Designer               |

---

## Catatan Desain

- Warna, layout, dan copy disesuaikan agar tidak terasa seperti template generator — setiap section punya rhythm dan alignment berbeda.
- Animasi menggunakan `transform`/`opacity` untuk menjaga performa, dan seluruh trigger animasi dibungkus `gsap.context()` agar bersih saat unmount.
- Data produk (gambar, harga, kondisi, size) diambil langsung dari backend — tidak ada data dummy di frontend.

---

## Lisensi

Internal project — belum ditentukan lisensi publik.
