// script.js
document.addEventListener('DOMContentLoaded', function() {
  var userName = localStorage.getItem('userName');

  if (userName) {
      document.getElementById('nameDisplay').innerText = 'Selamat datang, ' + userName + "\n Susunlah Puzzle ini dan Tebak Siapa Nama Pahlawan tersebut" + '!';
  } else {
      document.getElementById('nameDisplay').innerText = 'Nama tidak ditemukan. Silakan kembali ke halaman sebelumnya dan masukkan nama.';
  }
});
const puzzlePieces = [
  { id: 1, image: "assets/img/2(1).jpg" },
  { id: 2, image: "assets/img/2(2).jpg" },
  { id: 3, image: "assets/img/2(3).jpg" },
  { id: 4, image: "assets/img/2(4).jpg" },
  { id: 5, image: "assets/img/2(5).jpg" },
  { id: 6, image: "assets/img/2(6).jpg" },
  { id: 7, image: "assets/img/2(7).jpg" },
  { id: 8, image: "assets/img/2(8).jpg" },
  { id: 9, image: "assets/img/2(9).jpg" },
];

const gridSize = Math.sqrt(puzzlePieces.length);
const puzzleSolution = [
  [9, 5, 1],
  [8, 3, 2],
  [6, 4, 7],
];

let puzzleSolved = false;

// Generate puzzle grid cells
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("div");
    cell.className = "puzzle-cell";
    cell.id = `cell-${i}-${j}`;
    document.querySelector(".puzzle-grid").appendChild(cell);
  }
}

// Generate puzzle pieces
puzzlePieces.forEach((piece, index) => {
  const pieceElement = document.createElement("div");
  pieceElement.className = "puzzle-piece";
  pieceElement.id = `piece-${piece.id}`;
  pieceElement.draggable = true;
  pieceElement.innerHTML = `<img src="${piece.image}" alt="${piece.id}">`;
  document.querySelector(".puzzle-pieces").appendChild(pieceElement);
});
// Add event listeners to puzzle grid cells
const gridCells = document.querySelectorAll(".puzzle-cell");
gridCells.forEach((cell) => {
  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  cell.addEventListener("drop", (e) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("text");
    const piece = document.querySelector(`#${pieceId}`);
    cell.appendChild(piece);
    checkPuzzle();
  });
});
// Add event listeners to puzzle pieces
const puzzlePiecesElements = document.querySelectorAll(".puzzle-piece");
puzzlePiecesElements.forEach((piece) => {
  piece.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", piece.id);
    piece.classList.add("dragging");
  });
  piece.addEventListener("dragend", () => {
    piece.classList.remove("dragging");
  });
});
// Check if the puzzle is solved
function checkPuzzle() {
  const gridCells = document.querySelectorAll(".puzzle-cell");
  let isSolved = true;
  gridCells.forEach((cell, index) => {
    const piece = cell.querySelector(".puzzle-piece");
    if (piece) {
      const pieceId = parseInt(piece.id.split("-")[1]);
      const rowIndex = Math.floor(index / gridSize);
      const colIndex = index % gridSize;
      if (pieceId !== puzzleSolution[rowIndex][colIndex]) {
        isSolved = false;
      }
    } else {
      isSolved = false;
    }
  });

  if (isSolved) {
    puzzleSolved = true;
    document.getElementById("input-container").style.display = "block";
    document.querySelector("#result").innerHTML =
      "Selamat! Kamu telah berhasil menyusun puzzle!";
  } else {
    puzzleSolved = false;
    document.getElementById("input-container").style.display = "none";
    document.querySelector("#result").innerHTML =
      "Sorry, the puzzle is not solved yet.";
  }
}

const namaBenar = "Soekarno"; // Ganti dengan nama yang benar

function checkAnswer() {
  if (puzzleSolved) {
    const namaTebakan = document.getElementById("nama").value;
    const result = document.getElementById("result");

    if (namaTebakan.toLowerCase() === namaBenar.toLowerCase()) {
      result.innerHTML = "Selamat! Tebakan Anda benar.";
      const nextLevelContainer = document.createElement("div");
      nextLevelContainer.innerHTML = `
          <p>Mau melanjutkan ke level selanjutnya?</p>
          <button class="button" onclick="nextLevel()">Ya</button>
          <button class="button" onclick="goHome()">Tidak</button>
        `;
      document.body.appendChild(nextLevelContainer);
    } else {
      result.innerHTML = "Salah! Coba lagi.";
    }
  } else {
    alert("Puzzle belum selesai disusun!");
  }
}

function nextLevel() {
  // Ganti dengan URL halaman selanjutnya
  window.location.href = "level-3.html";
}

function goHome() {
  // Ganti dengan URL halaman beranda
  window.location.href = "index.html";
}
