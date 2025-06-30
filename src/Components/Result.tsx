import React from "react";
import "./Result.css";

type ResultProps = {
  onReset: () => void;
};

const Result: React.FC<ResultProps> = ({ onReset }) => {
  return (
    <div className="result">
      <button onClick={onReset}>🔄 Play Again</button>
    </div>
  );
};

export default Result;
