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
    { id: 1, image: "assets/img/3(1).jpg" },
    { id: 2, image: "assets/img/3(2).jpg" },
    { id: 3, image: "assets/img/3(3).jpg" },
    { id: 4, image: "assets/img/3(4).jpg" },
    { id: 5, image: "assets/img/3(5).jpg" },
    { id: 6, image: "assets/img/3(6).jpg" },
    { id: 7, image: "assets/img/3(7).jpg" },
    { id: 8, image: "assets/img/3(8).jpg" },
    { id: 9, image: "assets/img/3(9).jpg" },
    { id: 10, image: "assets/img/3(10).jpg" },
    { id: 11, image: "assets/img/3(11).jpg" },
    { id: 12, image: "assets/img/3(12).jpg" },
    { id: 13, image: "assets/img/3(13).jpg" },
    { id: 14, image: "assets/img/3(14).jpg" },
    { id: 15, image: "assets/img/3(15).jpg" },
    { id: 16, image: "assets/img/3(16).jpg" },
  ];
  
  const gridSize = Math.sqrt(puzzlePieces.length);
  const puzzleSolution = [
    [9, 5, 1, 10],
    [8, 3, 2, 11],
    [6, 4, 7, 12],
    [13, 16, 15, 14],
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
  
  const namaBenar = "Pangeran Diponegoro"; 
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
    window.location.href = "level-4.html";
  }
  
  function goHome() {
    window.location.href = "index.html";
  }
  