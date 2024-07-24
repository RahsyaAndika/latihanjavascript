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
  { id: 1, image: "assets/img/4(1).png" },
  { id: 2, image: "assets/img/4(2).png" },
  { id: 3, image: "assets/img/4(3).png" },
  { id: 4, image: "assets/img/4(4).png" },
  { id: 5, image: "assets/img/4(5).png" },
  { id: 6, image: "assets/img/4(6).png" },
  { id: 7, image: "assets/img/4(7).png" },
  { id: 8, image: "assets/img/4(8).png" },
  { id: 9, image: "assets/img/4(9).png" },
  { id: 10, image: "assets/img/4(10).png" },
  { id: 11, image: "assets/img/4(11).png" },
  { id: 12, image: "assets/img/4(12).png" },
  { id: 13, image: "assets/img/4(13).png" },
  { id: 14, image: "assets/img/4(14).png" },
  { id: 15, image: "assets/img/4(15).png" },
  { id: 16, image: "assets/img/4(16).png" },
  { id: 17, image: "assets/img/4(17).png" },
  { id: 18, image: "assets/img/4(18).png" },
  { id: 19, image: "assets/img/4(19).png" },
  { id: 20, image: "assets/img/4(20).png" },
  { id: 21, image: "assets/img/4(21).png" },
  { id: 22, image: "assets/img/4(22).png" },
  { id: 23, image: "assets/img/4(23).png" },
  { id: 24, image: "assets/img/4(24).png" },
  { id: 25, image: "assets/img/4(25).png" },
  ];
  
  const gridSize = Math.sqrt(puzzlePieces.length);
  const puzzleSolution = [
    [5, 12, 23, 25, 11],
    [9, 3, 7, 2, 10],
    [24, 18, 21, 15, 19],
    [1, 4, 6, 8, 13],
    [22, 20, 17, 16, 14],
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
        "Maaf, Puzzle yang kamu susun salah.";
    }
  }
  
  const namaBenar = "Moh. Hatta"; 
  function checkAnswer() {
    if (puzzleSolved) {
      const namaTebakan = document.getElementById("nama").value;
      const result = document.getElementById("result");
  
      if (namaTebakan.toLowerCase() === namaBenar.toLowerCase()) {
        result.innerHTML = "Selamat! Tebakan Anda benar.";
        const nextLevelContainer = document.createElement("div");
        nextLevelContainer.innerHTML = `
            <p>Selamat Kamu Telah Menyelesaikan Permainan Puzzle Game Pahlawan Ini...</p>
            <button class="button" onclick="goHome()">Kembali</button>
          `;
        document.body.appendChild(nextLevelContainer);
      } else {
        result.innerHTML = "Salah! Coba lagi.";
      }
    } else {
      alert("Puzzle belum selesai disusun!");
    }
  }
  function goHome() {
    window.location.href = "index.html";
  }
  