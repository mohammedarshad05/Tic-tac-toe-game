import React from "react";
import "./ModeSelector.css";

type ModeSelectorProps = {
  onSelectMode: (mode: "1v1" | "bot") => void;
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="mode-selector">
      <h2>Choose Your Game Mode</h2>
      <div className="mode-buttons">
        <button className="mode-btn" onClick={() => onSelectMode("1v1")}>
          <span>Player vs Player</span>
          <div className="line"></div>
        </button>

        <button className="mode-btn" onClick={() => onSelectMode("bot")}>
          <span>Player vs Computer</span>
          <div className="line"></div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
