// API Base URL - sesuaikan dengan backend FastAPI
const API_URL = "http://localhost:8000";

// State untuk edit modal
let editState = {
  type: null,
  index: null,
};

// ===== Tab Navigation =====
document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    // Update active tab button
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Update active tab content
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");

    // Load data when switching tabs
    if (tabId === "players") {
      loadPemain();
    } else if (tabId === "questions") {
      loadPertanyaan();
    } else if (tabId === "challenges") {
      loadTantangan();
    }
  });
});

// ===== Game Functions =====
async function acakPemain() {
  try {
    const response = await fetch(`${API_URL}/Acak-acakan`);
    const data = await response.text();

    const resultBox = document.getElementById("gameResult");
    resultBox.innerHTML = `<p class="result-text">🎲 ${data}</p>`;
    resultBox.classList.add("loading");
    setTimeout(() => resultBox.classList.remove("loading"), 500);

    // Tampilkan tombol aksi jika ada pemain
    if (!data.includes("Tidak ada pemainnya")) {
      document.getElementById("actionButtons").style.display = "flex";
    }
  } catch (error) {
    showError("Gagal mengacak pemain. Pastikan server berjalan!");
  }
}

async function acakTruthOrDare() {
  try {
    const response = await fetch(`${API_URL}/Acak-TruthorDare`);
    const data = await response.text();

    const resultBox = document.getElementById("gameResult");
    const actionButtons = document.getElementById("actionButtons");

    // Animasi loading
    resultBox.classList.add("loading");
    resultBox.innerHTML = `<p class="result-text">🔀 Mengacak...</p>`;

    setTimeout(() => {
      resultBox.innerHTML = `<p class="result-text">${data}</p>`;
      resultBox.classList.remove("loading");

      // Deteksi Truth atau Dare dari response
      if (data.includes("Truth")) {
        // Tampilkan hanya tombol pertanyaan
        actionButtons.innerHTML = `
          <button class="btn btn-truth" onclick="acakPertanyaan()">
            <span class="icon">❓</span>
            Ambil Pertanyaan
          </button>
        `;
        actionButtons.style.display = "flex";
      } else if (data.includes("Dare")) {
        // Tampilkan hanya tombol tantangan
        actionButtons.innerHTML = `
          <button class="btn btn-dare" onclick="acakTantangan()">
            <span class="icon">🎯</span>
            Ambil Tantangan
          </button>
        `;
        actionButtons.style.display = "flex";
      }
    }, 800);
  } catch (error) {
    showError("Gagal mengacak Truth or Dare!");
  }
}

async function acakPertanyaan() {
  try {
    const response = await fetch(`${API_URL}/Acak Pertanyaan`);
    const data = await response.text();

    const resultBox = document.getElementById("gameResult");
    resultBox.classList.add("loading");
    resultBox.innerHTML = `<p class="result-text">❓ Memilih pertanyaan...</p>`;

    setTimeout(() => {
      resultBox.innerHTML = `<p class="result-text">${data}</p>`;
      resultBox.classList.remove("loading");
    }, 800);
  } catch (error) {
    showError("Gagal mengambil pertanyaan!");
  }
}

async function acakTantangan() {
  try {
    const response = await fetch(`${API_URL}/Acak Tantangan`);
    const data = await response.text();

    const resultBox = document.getElementById("gameResult");
    resultBox.classList.add("loading");
    resultBox.innerHTML = `<p class="result-text">🎯 Memilih tantangan...</p>`;

    setTimeout(() => {
      resultBox.innerHTML = `<p class="result-text">${data}</p>`;
      resultBox.classList.remove("loading");
    }, 800);
  } catch (error) {
    showError("Gagal mengambil tantangan!");
  }
}

// ===== Players Functions =====
async function tambahPemain() {
  const input = document.getElementById("playerName");
  const nama = input.value.trim();

  if (!nama) {
    alert("Masukkan nama pemain!");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/Pemain?Nama_Pemain=${encodeURIComponent(nama)}`,
      {
        method: "POST",
      }
    );
    const data = await response.text();

    input.value = "";
    loadPemain();
    showSuccess(data);
  } catch (error) {
    showError("Gagal menambah pemain!");
  }
}

async function loadPemain() {
  try {
    const response = await fetch(`${API_URL}/Pemain`);
    const data = await response.json();

    const list = document.getElementById("playersList");

    if (!data || data.length === 0) {
      list.innerHTML =
        '<div class="empty-message">Belum ada pemain. Tambahkan pemain untuk memulai!</div>';
      return;
    }

    list.innerHTML = data
      .map(
        (pemain, index) => `
            <div class="item">
                <div class="item-content">
                    <span class="item-number">${index + 1}.</span>
                    <span class="item-text">${pemain}</span>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editPemain(${
                      index + 1
                    })">
                        <span class="icon">✏️</span> Edit
                    </button>
                    <button class="btn btn-delete" onclick="hapusPemain(${
                      index + 1
                    })">
                        <span class="icon">🗑️</span> Hapus
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    showError("Gagal memuat daftar pemain!");
  }
}

async function hapusPemain(urutan) {
  if (!confirm("Yakin ingin menghapus pemain ini?")) return;

  try {
    const response = await fetch(`${API_URL}/Pemain?Urutan=${urutan}`, {
      method: "DELETE",
    });
    const data = await response.text();

    loadPemain();
    showSuccess(data);
  } catch (error) {
    showError("Gagal menghapus pemain!");
  }
}

function editPemain(urutan) {
  editState = { type: "pemain", index: urutan };
  showModal();
}

async function updatePemain(urutan, namaBaru) {
  try {
    const response = await fetch(
      `${API_URL}/Pemain?Urutan=${urutan}&Mengganti=${encodeURIComponent(
        namaBaru
      )}`,
      {
        method: "PUT",
      }
    );
    const data = await response.text();

    loadPemain();
    showSuccess(data);
  } catch (error) {
    showError("Gagal mengupdate pemain!");
  }
}

// ===== Questions Functions =====
async function tambahPertanyaan() {
  const input = document.getElementById("questionText");
  const pertanyaan = input.value.trim();

  if (!pertanyaan) {
    alert("Masukkan pertanyaan!");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/Pertanyaan?pertanyaan=${encodeURIComponent(pertanyaan)}`,
      {
        method: "POST",
      }
    );
    const data = await response.text();

    input.value = "";
    loadPertanyaan();
    showSuccess("Pertanyaan berhasil ditambahkan!");
  } catch (error) {
    showError("Gagal menambah pertanyaan!");
  }
}

async function loadPertanyaan() {
  try {
    const response = await fetch(`${API_URL}/Pertanyaan`);
    const questions = await response.json();

    const list = document.getElementById("questionsList");

    if (!questions || questions.length === 0) {
      list.innerHTML =
        '<div class="empty-message">Belum ada pertanyaan. Tambahkan pertanyaan untuk memulai!</div>';
      return;
    }

    list.innerHTML = questions
      .map(
        (pertanyaan, index) => `
            <div class="item">
                <div class="item-content">
                    <span class="item-number">${index + 1}.</span>
                    <span class="item-text">${pertanyaan}</span>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editPertanyaan(${
                      index + 1
                    })">
                        <span class="icon">✏️</span> Edit
                    </button>
                    <button class="btn btn-delete" onclick="hapusPertanyaan(${
                      index + 1
                    })">
                        <span class="icon">🗑️</span> Hapus
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    showError("Gagal memuat daftar pertanyaan!");
  }
}

async function hapusPertanyaan(urutan) {
  if (!confirm("Yakin ingin menghapus pertanyaan ini?")) return;

  try {
    const response = await fetch(`${API_URL}/Pertanyaan?Urutan=${urutan}`, {
      method: "DELETE",
    });
    const data = await response.text();

    loadPertanyaan();
    showSuccess(data);
  } catch (error) {
    showError("Gagal menghapus pertanyaan!");
  }
}

function editPertanyaan(urutan) {
  editState = { type: "pertanyaan", index: urutan };
  showModal();
}

async function updatePertanyaan(urutan, textBaru) {
  try {
    const response = await fetch(
      `${API_URL}/Pertanyaan?Urutan=${urutan}&Mengganti=${encodeURIComponent(
        textBaru
      )}`,
      {
        method: "PUT",
      }
    );
    const data = await response.text();

    loadPertanyaan();
    showSuccess(data);
  } catch (error) {
    showError("Gagal mengupdate pertanyaan!");
  }
}

// ===== Challenges Functions =====
async function tambahTantangan() {
  const input = document.getElementById("challengeText");
  const tantangan = input.value.trim();

  if (!tantangan) {
    alert("Masukkan tantangan!");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/Tantang?Tantangan=${encodeURIComponent(tantangan)}`,
      {
        method: "POST",
      }
    );
    const data = await response.text();

    input.value = "";
    loadTantangan();
    showSuccess("Tantangan berhasil ditambahkan!");
  } catch (error) {
    showError("Gagal menambah tantangan!");
  }
}

async function loadTantangan() {
  try {
    const response = await fetch(`${API_URL}/Tantang`);
    const challenges = await response.json();

    const list = document.getElementById("challengesList");

    if (!challenges || challenges.length === 0) {
      list.innerHTML =
        '<div class="empty-message">Belum ada tantangan. Tambahkan tantangan untuk memulai!</div>';
      return;
    }

    list.innerHTML = challenges
      .map(
        (tantangan, index) => `
            <div class="item">
                <div class="item-content">
                    <span class="item-number">${index + 1}.</span>
                    <span class="item-text">${tantangan}</span>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editTantangan(${
                      index + 1
                    })">
                        <span class="icon">✏️</span> Edit
                    </button>
                    <button class="btn btn-delete" onclick="hapusTantangan(${
                      index + 1
                    })">
                        <span class="icon">🗑️</span> Hapus
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    showError("Gagal memuat daftar tantangan!");
  }
}

async function hapusTantangan(urutan) {
  if (!confirm("Yakin ingin menghapus tantangan ini?")) return;

  try {
    const response = await fetch(`${API_URL}/Tantang?Urutan=${urutan}`, {
      method: "DELETE",
    });
    const data = await response.text();

    loadTantangan();
    showSuccess(data);
  } catch (error) {
    showError("Gagal menghapus tantangan!");
  }
}

function editTantangan(urutan) {
  editState = { type: "tantangan", index: urutan };
  showModal();
}

async function updateTantangan(urutan, textBaru) {
  try {
    const response = await fetch(
      `${API_URL}/Tantang?Urutan=${urutan}&Mengganti=${encodeURIComponent(
        textBaru
      )}`,
      {
        method: "PUT",
      }
    );
    const data = await response.text();

    loadTantangan();
    showSuccess(data);
  } catch (error) {
    showError("Gagal mengupdate tantangan!");
  }
}

// ===== Modal Functions =====
function showModal() {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  document.getElementById("editText").focus();
}

function closeModal() {
  const modal = document.getElementById("editModal");
  modal.style.display = "none";
  document.getElementById("editText").value = "";
  editState = { type: null, index: null };
}

async function saveEdit() {
  const newText = document.getElementById("editText").value.trim();

  if (!newText) {
    alert("Teks tidak boleh kosong!");
    return;
  }

  const { type, index } = editState;

  if (type === "pemain") {
    await updatePemain(index, newText);
  } else if (type === "pertanyaan") {
    await updatePertanyaan(index, newText);
  } else if (type === "tantangan") {
    await updateTantangan(index, newText);
  }

  closeModal();
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("editModal");
  if (event.target === modal) {
    closeModal();
  }
};

// ===== Notification Functions =====
function showSuccess(message) {
  // Simple alert - bisa diganti dengan toast notification
  const resultBox = document.getElementById("gameResult");
  const originalContent = resultBox.innerHTML;

  resultBox.innerHTML = `<p class="result-text">✅ ${message}</p>`;

  setTimeout(() => {
    resultBox.innerHTML = originalContent;
  }, 2000);
}

function showError(message) {
  const resultBox = document.getElementById("gameResult");
  const originalContent = resultBox.innerHTML;

  resultBox.innerHTML = `<p class="result-text">❌ ${message}</p>`;

  setTimeout(() => {
    resultBox.innerHTML = originalContent;
  }, 2000);
}

// ===== Initialize on Load =====
document.addEventListener("DOMContentLoaded", () => {
  // Load initial data
  loadPemain();
});
