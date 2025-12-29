# Frontend untuk Truth or Dare

Cara singkat menjalankan (asumsi backend berjalan di `http://localhost:8000`):

1. Jalankan backend (dari folder `backend`):

```bash
pip install fastapi uvicorn
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

2. Buka `frontend/index.html` di browser (cukup double-click) atau jalankan server statis:

```bash
# Python 3
python -m http.server 5500 --directory frontend
# lalu buka http://localhost:5500
```

3. Di UI Anda dapat menambahkan pemain, pertanyaan, tantangan, lalu klik "Mainkan Sekali" untuk mendapatkan hasil acak.

Catatan: Frontend mengasumsikan endpoint backend seperti `/Pemain`, `/Pertanyaan`, `/Tantang`, `/Acak-acakan`, `/Acak-TruthorDare`, `/Acak Pertanyaan`, `/Acak Tantangan`.
