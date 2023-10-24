import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./componentes/Square.jsx";
import { TURNOS, WINNER_COMBOS } from "./constantes.js";
import { checkWinner, checkEndGame } from "./logic/borad.js";
import { WinnerModal } from "./componentes/WinnerModal.jsx";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNOS.X);

  const [winner, setWiner] = useState(null); //null es que no hay ganar y false es que hay un empate

  const updateBoard = (index) => {
    //si ya tiene un x O una o
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn == TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWiner(newWinner);
      confetti(); // efecto de confeti
    } else if (checkEndGame(newBoard)) {
      setWiner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNOS.X);
    setWiner(null);
  };
  return (
    <>
      <main className="board">
        <h1>TIK TAK</h1>
        <button onClick={resetGame}> Reset</button>
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

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  );
}

export default App;
