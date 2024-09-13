import { useState } from "react";
import Square from './components/Square';

const NUM_SQUARES = 9

function Board({ xIsNext, squares, onPlay }) {
  const handleSquareClick = (i) => {
    const nextSquares = squares.slice();

    if (!squares[i] && !winner) {
      nextSquares[i] = xIsNext ? "X" : "O";
      onPlay(nextSquares);
    }
  };

  const winner = calculateWinner(squares);

  let status;

  if(winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const buildRows = () => {
    const rows = [];
    let j = 0;

    for(let i = 0; i < NUM_SQUARES; i+=3) {
      rows.push(
        <div key={j} className="board-row">
          <Square key={i} value={squares[i]} onSquareClick={() => handleSquareClick(i)} />
          <Square key={i + 1} value={squares[i + 1]} onSquareClick={() => handleSquareClick(i + 1)} />
          <Square key={i + 2} value={squares[i + 2]} onSquareClick={() => handleSquareClick(i + 2)} />
        </div>
      );
      j++;
    }

    return rows;
  };

  return (
    <>
      <div className="status">{status}</div>
      {buildRows()}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    const nextHistory = [...history.slice(0, nextMove + 1)];
    setCurrentMove(nextMove);
    setHistory(nextHistory);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = `Go to game start`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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