# Truth or Dare - Aplikasi Permainan

Aplikasi web interaktif untuk bermain Truth or Dare bersama teman-teman!

## 🎮 Fitur

- **Manajemen Pemain**: Tambah, edit, dan hapus pemain
- **Manajemen Pertanyaan**: Kelola bank pertanyaan Truth
- **Manajemen Tantangan**: Kelola bank tantangan Dare
- **Permainan Interaktif**:
  - Acak pemain secara otomatis
  - Pilih Truth or Dare secara random
  - Ambil pertanyaan atau tantangan secara acak

## 🚀 Cara Menjalankan

### Backend (FastAPI)

1. Pastikan Python sudah terinstall
2. Buka terminal di folder `backend`
3. Install dependencies (jika belum):
   ```bash
   pip install fastapi uvicorn
   ```
4. Jalankan server:
   ```bash
   uvicorn main:app --reload
   ```
5. Server akan berjalan di `http://localhost:8000`
6. Akses dokumentasi API di `http://localhost:8000/docs`

### Frontend

1. Buka file `frontend/index.html` di browser

   - **Cara 1**: Double-click file `index.html`
   - **Cara 2**: Klik kanan → Open with → Browser pilihan Anda
   - **Cara 3**: Gunakan Live Server extension di VS Code

2. Pastikan backend sudah berjalan sebelum menggunakan aplikasi

## 📖 Cara Menggunakan

### 1. Setup Awal

- Buka tab **"👥 Pemain"**
- Tambahkan nama-nama pemain yang akan bermain
- Minimal 2 pemain untuk permainan yang menyenangkan

### 2. Tambah Pertanyaan & Tantangan

- Buka tab **"❓ Pertanyaan"** untuk menambah pertanyaan Truth
- Buka tab **"🎯 Tantangan"** untuk menambah tantangan Dare
- Tambahkan minimal beberapa item di masing-masing kategori

### 3. Mulai Bermain

- Buka tab **"🎲 Main Game"**
- Klik **"Acak Pemain"** untuk memilih pemain secara random
- Klik **"Truth or Dare?"** untuk menentukan pilihan
- Klik **"Ambil Pertanyaan"** atau **"Ambil Tantangan"** sesuai hasil

## 🛠️ Teknologi

### Backend

- FastAPI (Python web framework)
- Uvicorn (ASGI server)

### Frontend

- HTML5
- CSS3 (dengan animasi dan gradient modern)
- JavaScript (Vanilla JS untuk komunikasi API)

## 📁 Struktur Project

```
TruthorDare/
├── backend/
│   ├── main.py                          # Entry point FastAPI
│   └── apipipiipiiipppipipipiipipipipipipip/
│       ├── __init__.py
│       ├── Pemainininininininininininin.py  # API Pemain
│       ├── Permainan.py                 # API Permainan
│       ├── Pertanyaaan.py               # API Pertanyaan
│       └── Tantangan.py                 # API Tantangan
└── frontend/
    ├── index.html                       # Halaman utama
    ├── style.css                        # Styling
    └── app.js                           # Logika aplikasi
```

## 🔌 API Endpoints

### Pemain

- `POST /Pemain` - Tambah pemain baru
- `GET /Pemain` - Lihat semua pemain
- `PUT /Pemain` - Update pemain
- `DELETE /Pemain` - Hapus pemain

### Pertanyaan (Truth)

- `POST /Pertanyaan` - Tambah pertanyaan
- `GET /Pertanyaan` - Lihat semua pertanyaan
- `PUT /Pertanyaan` - Update pertanyaan
- `DELETE /Pertanyaan` - Hapus pertanyaan

### Tantangan (Dare)

- `POST /Tantang` - Tambah tantangan
- `GET /Tantang` - Lihat semua tantangan
- `PUT /Tantang` - Update tantangan
- `DELETE /Tantang` - Hapus tantangan

### Permainan

- `GET /Acak-acakan` - Acak pemain
- `GET /Acak-TruthorDare` - Acak Truth or Dare
- `GET /Acak Pertanyaan` - Acak pertanyaan
- `GET /Acak Tantangan` - Acak tantangan

## 💡 Tips

1. **Tambahkan banyak pertanyaan dan tantangan** agar permainan tidak monoton
2. **Sesuaikan tingkat kesulitan** dengan kenyamanan pemain
3. **Buat aturan sendiri** - aplikasi ini fleksibel!
4. **Gunakan mode fullscreen** di browser untuk pengalaman yang lebih immersive

## ⚠️ Troubleshooting

### Frontend tidak bisa connect ke backend

- Pastikan backend sudah berjalan di `http://localhost:8000`
- Cek console browser (F12) untuk melihat error
- Pastikan tidak ada CORS issue

### Data hilang setelah refresh

- Data disimpan di memory backend (tidak persistent)
- Untuk data persistent, backend perlu dimodifikasi menggunakan database

## 🎨 Customization

### Mengubah Port Backend

Edit di `app.js` baris pertama:

```javascript
const API_URL = "http://localhost:8000"; // Ubah port sesuai kebutuhan
```

### Mengubah Warna/Theme

Edit file `style.css` bagian gradient colors sesuai selera Anda.

## 📝 License

Project ini dibuat untuk tujuan pembelajaran dan hiburan.

---

**Selamat Bermain! 🎉**
