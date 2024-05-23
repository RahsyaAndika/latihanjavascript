const nilai = document.getElementById("nilai");
const tampilButton = document.getElementById("tampilkan");
const resetButton = document.getElementById("reset");
const hasilTampilan = document.getElementById("hasil-tampilan");

tampilButton.addEventListener("click", tampilkanHasil);
resetButton.addEventListener("click", resetNilai);

function tampilkanHasil() {
  const nama = document.getElementById("nama").value;
  const nim = document.getElementById("nim").value;
  const mataKuliah = document.getElementById("mata-kuliah").value;
  const nilaiAkhir = document.getElementById("nilai-akhir").value;

  const nilaiHuruf = getNilaiHuruf(nilaiAkhir);
  const indeksNilai = getIndeksNilai(nilaiAkhir);
  const keterangan = getKeterangan(nilaiAkhir);
  const hasil = `
        <h3>Hasil Input Nilai Mahasiswa</h3>
        <table>
            <tr>
                <th>NAMA : </th>
                <td>${nama}</td>
            </tr>
            <tr>
                <th>NIM : </th>
                <td>${nim}</td>
            </tr>
            <tr>
                <th>Mata Kuliah : </th>
                <td>${mataKuliah}</td>
            </tr>
            <tr>
                <th>Nilai Akhir : </th>
                <td>${nilaiAkhir}</td>
            </tr>
            <tr>
                <th>Nilai Huruf : </th>
                <td>${nilaiHuruf}</td>
            </tr>
            <tr>
                <th>Indeks Nilai : </th>
                <td>${indeksNilai}</td>
            </tr>
            <tr>
                <th>Keterangan : </th>
                <td>${keterangan}</td>
            </tr>
        </table>
    `;

  hasilTampilan.innerHTML = hasil;
}

function resetNilai() {
  nilai.reset();
  hasilTampilan.innerHTML = "";
}
function getNilaiHuruf(nilaiAkhir) {
  if (nilaiAkhir >= 100) {
    return "error";
  } else if (nilaiAkhir >= 85) {
    return "A";
  } else if (nilaiAkhir >= 79) {
    return "A-";
  } else if (nilaiAkhir >= 74) {
    return "B+";
  } else if (nilaiAkhir >= 69) {
    return "B";
  } else if (nilaiAkhir >= 64) {
    return "B-";
  } else if (nilaiAkhir >= 59) {
    return "C+";
  } else if (nilaiAkhir >= 54) {
    return "C";
  } else if (nilaiAkhir >= 41) {
    return "D";
  } else {
    return "E";
  }
}

function getIndeksNilai(nilaiAkhir) {
  if (nilaiAkhir >= 100) {
    return "error";
  } else if (nilaiAkhir >= 85) {
    return "4.00";
  } else if (nilaiAkhir >= 79) {
    return "3.67";
  } else if (nilaiAkhir >= 74) {
    return "3.33";
  } else if (nilaiAkhir >= 69) {
    return "3.00";
  } else if (nilaiAkhir >= 64) {
    return "2.67";
  } else if (nilaiAkhir >= 59) {
    return "2.33";
  } else if (nilaiAkhir >= 54) {
    return "2.00";
  } else if (nilaiAkhir >= 41) {
    return "1.00";
  } else {
    return "0.00";
  }
}

function getKeterangan(nilaiAkhir) {
  if (nilaiAkhir >= 100) {
    return "error";
  } else if (nilaiAkhir >= 85) {
    return "Perfect";
  } else if (nilaiAkhir >= 79) {
    return "Excellent";
  } else if (nilaiAkhir >= 74) {
    return "Great";
  } else if (nilaiAkhir >= 69) {
    return "Good";
  } else if (nilaiAkhir >= 64) {
    return "-";
  } else if (nilaiAkhir >= 59) {
    return "-";
  } else if (nilaiAkhir >= 54) {
    return "-";
  } else if (nilaiAkhir >= 41) {
    return "-";
  } else {
    return "-";
  }
}
