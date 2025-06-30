import React, { useEffect, useState } from "react";
import ModeSelector from "./Components/ModeSelector";
import Game from "./Components/Game";

const App: React.FC = () => {
  const [mode, setMode] = useState<"1v1" | "bot" | null>(null);

  const handleModeSelect = (selectedMode: "1v1" | "bot") => {
    setMode(selectedMode);
  };

  const handleResetMode = () => {
    setMode(null);
  };
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  return (
    <div className="app">
      {mode === null ? (
        <ModeSelector onSelectMode={handleModeSelect} />
      ) : (
        <>
          <button className="back-btn" onClick={handleResetMode}>
            ⬅ Back to Mode Selection
          </button>

          <Game isBotGame={mode === "bot"} />

          <footer className="footer">
            <a
              href="https://www.instagram.com/ot.arsh/"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-link"
            >
              <i className="fab fa-instagram insta-icon"></i>
              Follow me on <strong>@ot.arsh</strong>
            </a>
          </footer>

          <button className="theme-toggle" onClick={toggleTheme}>
            <div className="theme-icon"></div>
          </button>
        </>
      )}
    </div>
  );
};

export default App;
