document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    const themeBtn = document.getElementById('theme-btn');
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameWon = false;
  
    function createCell(index) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = index;
      cell.addEventListener('click', () => cellClick(index));
      board.appendChild(cell);
      return cell;
    }
  
    function cellClick(index) {
      if (gameBoard[index] === '' && !gameWon) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add('occupied');
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Turno de: ${currentPlayer}`;
      }
    }
  
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          cells[a].style.color = 'red';
          cells[b].style.color = 'red';
          cells[c].style.color = 'red';
          gameWon = true;
          status.textContent = `¡${gameBoard[a]} gana!`; // Cambiado a gameBoard[a] en lugar de currentPlayer
          setTimeout(() => {
            alert(`¡${gameBoard[a]} gana!`); // Cambiado a gameBoard[a] en lugar de currentPlayer
            resetGame();
          }, 0);
          break;
        }
      }
    }
  
    function checkDraw() {
      if (!gameBoard.includes('') && !gameWon) {
        status.textContent = '¡Empate!';
        gameWon = true;
        setTimeout(() => {
          alert('¡Empate!');
          resetGame();
        }, 0);
      }
    }
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameWon = false;
      currentPlayer = 'X';
      cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = 'black';
        cell.classList.remove('occupied');
      });
      status.textContent = `Turno de: ${currentPlayer}`;
    }
  
    resetBtn.addEventListener('click', resetGame);
  
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      board.classList.toggle('dark-mode');
      cells.forEach(cell => cell.classList.toggle('dark-mode'));
      status.classList.toggle('dark-mode');
      resetBtn.classList.toggle('dark-mode');
      themeBtn.classList.toggle('dark-mode');
    });
  
    // Initial setup
    cells.forEach(cell => board.appendChild(cell));
  });
  