import { useState } from "react";

import "./App.css";

const TURNOS = {
  X: "X",
  O: "O",
};
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? `is-selected` : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNOS.X);

  const updateBoard = (index) => {
    //si ya tiene un x O una o
    if (board[index]) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn == TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
  };
  return (
    <>
      <main className="board">
        <h1>holi</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNOS.X}>{TURNOS.X}</Square>
          <Square isSelected={turn === TURNOS.O}>{TURNOS.O}</Square>
        </section>
      </main>
    </>
  );
}

export default App;
