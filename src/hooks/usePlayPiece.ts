import { boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;
    const currentPlayerNumber = newBoard[col][row];
  
    const diagonallyList1 = () => {
      let leftTop: number[] = [];
      let rightBottom: number[] = [];

      for (let i = 1; i <= 3; i++) {
        if (Array.isArray(newBoard[col - i])) {
          leftTop = [...leftTop, newBoard[col - i][row + i]];
        }
      }

      for (let i = 1; i <= 3; i++) {
        if (Array.isArray(newBoard[col + i])) {
          rightBottom = [...rightBottom, newBoard[col + i][row - i]];
        }
      }

      leftTop = leftTop.reverse();
      leftTop.push(currentPlayerNumber);

      const diagonally = [...leftTop, ...rightBottom];

      return diagonally;
    }

    const diagonallyList2 = () => {
      let leftBottom: number[] = [];
      let rightTop: number[] = [];

      for (let i = 1; i <= 3; i++) {
        if (Array.isArray(newBoard[col - i])) {
          leftBottom = [...leftBottom, newBoard[col - i][row - i]];
        }
      }

      for (let i = 1; i <= 3; i++) {
        if (Array.isArray(newBoard[col + i])) {
          rightTop = [...rightTop, newBoard[col + i][row + i]];
        }
      }

      leftBottom = leftBottom.reverse();
      leftBottom.push(currentPlayerNumber);

      const diagonally = [...leftBottom, ...rightTop];


      return diagonally;
    }

    const diagonally1 = diagonallyList1();
    const diagonally2 = diagonallyList2();

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      testWin(diagonally1) || // TODO: Did win diagonally
      testWin(diagonally2) // TODO: Did win diagonally
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
