import React from 'react';
import { useState, FC } from 'react';
// import logo from './logo.svg';
import './App.css';

type Prop = {
  value: number,
  onPocketClick: (i:number, j:number) => void,
  i: number,
  j: number,
};

const numOfPocketsAndGoal = 7;
const initialNumOfStones: number[] = [4, 4, 4, 4, 4, 4, 0]; //TODO: numOfPocketsAndGoalに応じて変化するように修正

function Pocket({ value, onPocketClick, i, j }: Prop) {
  return (
    <button className='pocket' onClick={() => onPocketClick(i, j)}>
      {value}
    </button>
  );
}

function App() {
  const [isTurnOfPlayer1, setIsTurnOfPlayer1] = useState(true);
  const [arrOfNumOfStones, setArrOfNumOfStones] = useState([initialNumOfStones.slice(), initialNumOfStones.slice()]);

  function handleClick(i: number, j: number): void {
    if (calculateWinner(arrOfNumOfStones) !== null) {
      return;
    } else if ((isTurnOfPlayer1 && i === 0) || (!isTurnOfPlayer1 && i === 1)) {
      alert(`It's player${i+1}'s turn!`);
      return;
    } else if (arrOfNumOfStones[i][j] === 0) {
      alert("The pocket you selected has no stone!");
      return;
    }
    const newArrOfNumOfStones = arrOfNumOfStones.slice();

    var stonesInSelectedPocket = newArrOfNumOfStones[i][j];
    var indexI = i;
    var indexJ = j;
    newArrOfNumOfStones[i][j] = 0;

    while (stonesInSelectedPocket > 0) {
      if (indexJ === numOfPocketsAndGoal-1) {
        indexJ = 0;
        indexI = (indexI === 0) ? 1 : 0;
      } else {
        indexJ += 1;
      }
      newArrOfNumOfStones[indexI][indexJ] += 1;
      stonesInSelectedPocket -= 1;
    }
    setArrOfNumOfStones(newArrOfNumOfStones);
    setIsTurnOfPlayer1(!isTurnOfPlayer1);
  }

  const winner = calculateWinner(arrOfNumOfStones);
  let gameStatus;
  if (winner === null) {
    gameStatus = "Turn: Player" + ((isTurnOfPlayer1) ? "1" : "2");
  } else {
    gameStatus = "Winner: Player" + winner;
  }
  
  return (
    <>
      <div className="game-status">{gameStatus}</div>
      <div className='wrapper'>
        <div className='goals' id='player2'>
          <button className='goal'>{arrOfNumOfStones[0][6]}</button>
        </div>
        <div className='pockets'>
          <div className='pockets-row' id='player2'>
            <Pocket value={arrOfNumOfStones[0][5]} onPocketClick={handleClick} i={0} j={5} />
            <Pocket value={arrOfNumOfStones[0][4]} onPocketClick={handleClick} i={0} j={4} />
            <Pocket value={arrOfNumOfStones[0][3]} onPocketClick={handleClick} i={0} j={3} />
            <Pocket value={arrOfNumOfStones[0][2]} onPocketClick={handleClick} i={0} j={2} />
            <Pocket value={arrOfNumOfStones[0][1]} onPocketClick={handleClick} i={0} j={1} />
            <Pocket value={arrOfNumOfStones[0][0]} onPocketClick={handleClick} i={0} j={0} />
          </div>
          <div className='pockets-row' id='player1'>
            <Pocket value={arrOfNumOfStones[1][0]} onPocketClick={handleClick} i={1} j={0} />
            <Pocket value={arrOfNumOfStones[1][1]} onPocketClick={handleClick} i={1} j={1} />
            <Pocket value={arrOfNumOfStones[1][2]} onPocketClick={handleClick} i={1} j={2} />
            <Pocket value={arrOfNumOfStones[1][3]} onPocketClick={handleClick} i={1} j={3} />
            <Pocket value={arrOfNumOfStones[1][4]} onPocketClick={handleClick} i={1} j={4} />
            <Pocket value={arrOfNumOfStones[1][5]} onPocketClick={handleClick} i={1} j={5} />
          </div>
        </div>
        <div className='goals' id='player1'>
          <button className='goal'>{arrOfNumOfStones[1][6]}</button>
        </div>
      </div>
    </>
  );
}

function calculateWinner(arrOfNumOfStones: number[][]): string | null {
  let winner: string | null = null;
  for (let x = 0; x < 2; x++) {
    let allPocketsEmpty: boolean = true;
    for (let y = 0; y < arrOfNumOfStones[x].length - 1; y++) {
      if (arrOfNumOfStones[x][y] !== 0) {
        allPocketsEmpty = false;
      }
    }
    if (allPocketsEmpty) {
      if (x === 1) winner = "1";
      else winner = "2";
    }
  }
  return winner;
}

export default App;
