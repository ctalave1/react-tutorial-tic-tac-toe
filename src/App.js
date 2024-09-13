import { useState } from "react";
import Square from './components/Square';

const NUM_SQUARES = 9

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  let status;

  if(winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleSquareClick = (i) => {
    const nextSquares = squares.slice();

    if (!squares[i] && !winner) {
      nextSquares[i] = xIsNext ? "X" : "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  };

  const buildRows = () => {
    const rows = [];

    for(let i = 0; i < NUM_SQUARES; i+=3) {
      rows.push(
        <div className="board-row">
          <Square value={squares[i]} onSquareClick={() => handleSquareClick(i)} />
          <Square value={squares[i + 1]} onSquareClick={() => handleSquareClick(i + 1)} />
          <Square value={squares[i + 2]} onSquareClick={() => handleSquareClick(i + 2)} />
        </div>
      )
    }

    return rows;
  };

  return (
    <>
      <div className="status">{status}</div>
      {buildRows()}
      {/* <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div> */}
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};