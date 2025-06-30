import React, { useEffect, useState } from "react";
import Board from "./Board";
import Result from "./Result";
import "./Game.css";

type GameProps = {
  isBotGame: boolean;
};

const Game: React.FC<GameProps> = ({ isBotGame }) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Draw");
    } else {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const checkWinner = (b: string[]): string | null => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b1, c] of combos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }

    return null;
  };

  const botMove = () => {
    const tryWinningMove = (symbol: "X" | "O") => {
      const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let [a, b, c] of combos) {
        const line = [board[a], board[b], board[c]];
        const countSymbol = line.filter((v) => v === symbol).length;
        const emptyIndex = [a, b, c].find((i) => board[i] === "");

        if (countSymbol === 2 && emptyIndex !== undefined) {
          return emptyIndex;
        }
      }

      return null;
    };

    const winIndex = tryWinningMove("O");
    if (winIndex !== null) {
      handleClick(winIndex);
      return;
    }

    const blockIndex = tryWinningMove("X");
    if (blockIndex !== null) {
      handleClick(blockIndex);
      return;
    }

    const emptyIndices = board
      .map((val, idx) => (val === "" ? idx : null))
      .filter((idx) => idx !== null) as number[];

    if (emptyIndices.length > 0) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      handleClick(randomIndex);
    }
  };

  useEffect(() => {
    if (isBotGame && currentPlayer === "O" && !winner) {
      const botDelay = setTimeout(() => botMove(), 500);
      return () => clearTimeout(botDelay);
    }
  }, [board, currentPlayer, winner, isBotGame]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="game">
      <h2>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `${winner} Wins!`
          : `Current Turn: ${currentPlayer}`}
      </h2>
      <Board board={board} onCellClick={handleClick} />
      {winner && <Result onReset={resetGame} />}
    </div>
  );
};

export default Game;
