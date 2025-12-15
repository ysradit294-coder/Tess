let soalIndex = 0;
let nilai = 0;
let benar = 0;
let salah = 0;
let waktu = 15;
let timer;

const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScEJMYXVD0GevH3nP6NpI340YUWlHJ2rDMm-rfyCIS739w1tw/formResponse" ;

// FIELD ID SUDAH DIPASTIKAN BENAR DARI INPUT PENGGUNA:
const FIELD_ID_NAMA = 'entry.437577020';      
const FIELD_ID_ROLE = 'entry.901797838';      
const FIELD_ID_SCORE = 'entry.660013072';      
const FIELD_ID_ACCURACY = 'entry.129012407';   
const FIELD_ID_STATUS = 'entry.1599521228';

const soal = [
  { tanya: "Sinonim kata 'Cermat' adalah?", opsi: ["Ceroboh", "Teliti", "Lambat", "Biasa"], jawab: 1 },
  { tanya: "Antonim kata 'Optimis' adalah?", opsi: ["Yakin", "Positif", "Pesimis", "Percaya"], jawab: 2 },
  { tanya: "Kata baku dari 'Aktip' adalah?", opsi: ["Aktif", "Aktip", "Aktive", "Aktipv"], jawab: 0 },
  { tanya: "Antonim kata 'Efisien' adalah?", opsi: ["Cepat", "Boros", "Hemat", "Tepat"], jawab: 1 },
  { tanya: "Sinonim kata 'Valid' adalah?", opsi: ["Salah", "Asli", "Resmi", "Benar"], jawab: 3 },

  { tanya: "Jika 5 + 3 × 2 = ?", opsi: ["16", "11", "13", "10"], jawab: 1 },
  { tanya: "Deret angka: 2, 4, 8, 16, ...", opsi: ["18", "20", "24", "32"], jawab: 3 },
  { tanya: "10% dari 200 adalah?", opsi: ["10", "20", "25", "30"], jawab: 1 },
  { tanya: "Jika semua karyawan rajin. Budi adalah karyawan. Maka?", opsi: ["Budi rajin", "Budi malas", "Budi tidak rajin", "Tidak pasti"], jawab: 0 },
  { tanya: "1 lusin sama dengan?", opsi: ["10", "11", "12", "15"], jawab: 2 },

  { tanya: "Penulisan tanggal yang benar adalah?", opsi: ["12/Agustus/2024", "12-Agustus-2024", "12 Agustus 2024", "Agustus 12 2024"], jawab: 2 },
  { tanya: "Kalimat efektif adalah?", opsi: [
      "Dia pergi ke kantor untuk bekerja",
      "Dia pergi ke kantor untuk bekerja agar supaya mencari uang",
      "Dia pergi ke kantor demi agar bekerja",
      "Dia pergi agar supaya bekerja"
    ], jawab: 0 },
  { tanya: "Antonim kata 'Mayoritas' adalah?", opsi: ["Terbanyak", "Dominan", "Minoritas", "Umum"], jawab: 2 },
  { tanya: "Sinonim kata 'Evaluasi' adalah?", opsi: ["Penilaian", "Perhitungan", "Pengurangan", "Perubahan"], jawab: 0 },
  { tanya: "Kata tidak baku berikut adalah?", opsi: ["Aktivitas", "Risiko", "Analisis", "Ijin"], jawab: 3 },

  { tanya: "Jika A = 1, B = 2, maka C = ?", opsi: ["1", "2", "3", "4"], jawab: 2 },
  { tanya: "Deret huruf: A, C, E, G, ...", opsi: ["H", "I", "J", "K"], jawab: 1 },
  { tanya: "20% dari 150 adalah?", opsi: ["20", "25", "30", "35"], jawab: 2 },
  { tanya: "Jika hari ini Senin, 3 hari lagi adalah?", opsi: ["Rabu", "Kamis", "Jumat", "Sabtu"], jawab: 1 },
  { tanya: "50 : 5 × 2 = ?", opsi: ["5", "10", "20", "25"], jawab: 3 },

  { tanya: "Tujuan utama surat lamaran kerja adalah?", opsi: [
      "Meminta informasi",
      "Memperkenalkan diri",
      "Melamar pekerjaan",
      "Mengajukan keberatan"
    ], jawab: 2 },
  { tanya: "Bagian surat resmi yang berisi inti pesan disebut?", opsi: ["Pembuka", "Penutup", "Isi", "Kop surat"], jawab: 2 },
  { tanya: "Kalimat persuasif bertujuan untuk?", opsi: ["Menghibur", "Mempengaruhi", "Menjelaskan", "Menceritakan"], jawab: 1 },
  { tanya: "Laporan yang baik harus bersifat?", opsi: ["Subjektif", "Emosional", "Objektif", "Berlebihan"], jawab: 2 },
  { tanya: "Kata hubung yang tepat: Saya belajar ___ lulus ujian", opsi: ["dan", "agar", "tetapi", "karena"], jawab: 1 },

  { tanya: "Jika semua A adalah B, dan semua B adalah C, maka?", opsi: [
      "Semua C adalah A",
      "Semua A adalah C",
      "Sebagian C adalah A",
      "Tidak ada hubungan"
    ], jawab: 1 },
  { tanya: "Deret: 1, 4, 9, 16, ...", opsi: ["20", "24", "25", "30"], jawab: 2 },
  { tanya: "Perbandingan 2 : 4 sama dengan?", opsi: ["1 : 4", "1 : 3", "1 : 2", "2 : 8"], jawab: 2 },
  { tanya: "100 dibagi 4 lalu dikali 2 = ?", opsi: ["25", "40", "50", "60"], jawab: 2 },
  { tanya: "Kata yang paling tepat melengkapi: Kerja keras membawa ___", opsi: ["Masalah", "Kesuksesan", "Kelelahan", "Kegagalan"], jawab: 1 }
];

// ================= GAME LOGIC =================

function mulaiInfo() {
  if (nama.value === "" || kelas.value === "") {
    alert("Nama dan kelas wajib diisi!");
    return;
  }
  login.classList.add("hidden");
  info.classList.remove("hidden");
}

function mulaiGame() {
  info.classList.add("hidden");
  game.classList.remove("hidden");
  tampilSoal();
}

function tampilSoal() {
  if (soalIndex >= soal.length) {
    selesai();
    return;
  }

  waktu = 15;
  timer = setInterval(hitung, 1000);

  document.getElementById("soal").innerHTML =
    `<h3>Soal ${soalIndex + 1}/30</h3><p>${soal[soalIndex].tanya}</p>`;

  let pilihan = "";
  soal[soalIndex].opsi.forEach((o, i) => {
    pilihan += `<button onclick="jawab(${i})">${o}</button>`;
  });
  document.getElementById("jawaban").innerHTML = pilihan;
}

function hitung() {
  document.getElementById("timer").innerText = waktu;
  waktu--;
  if (waktu < 0) {
    clearInterval(timer);
    salah++;
    soalIndex++;
    tampilSoal();
  }
}

function jawab(pilihan) {
  clearInterval(timer);
  if (pilihan === soal[soalIndex].jawab) {
    benar++;
    nilai += 100 / soal.length;
  } else {
    salah++;
  }
  soalIndex++;
  tampilSoal();
}

function selesai() {
  game.classList.add("hidden");
  hasil.classList.remove("hidden");

  document.getElementById("rekap").innerHTML = `
    Nama: ${nama.value}<br>
    Kelas: ${kelas.value}<br>
    Benar: ${benar}<br>
    Salah: ${salah}<br>
    Nilai: ${Math.round(nilai)}
  `;

  kirimSpreadsheet();
}

function kirimSpreadsheet() {
  fetch("https://docs.google.com/forms/d/e/1FAIpQLScEJMYXVD0GevH3nP6NpI340YUWlHJ2rDMm-rfyCIS739w1tw/viewform?usp=pp_url&entry.437577020=tes&entry.901797838=tes&entry.660013072=1&entry.129012407=1&entry.1599521228=100", {
    method: "POST",
    body: JSON.stringify({
      nama: nama.value,
      kelas: kelas.value,
      benar: benar,
      salah: salah,
      nilai: Math.round(nilai)
    })
  });
}
  