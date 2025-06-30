import React from "react";
import "./Square";
import "./Board.css";
import Square from "./Square";

type BoardProps = {
  board: string[];
  onCellClick: (index: number) => void;
};

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
};

export default Board;
