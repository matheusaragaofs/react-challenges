import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const players = {
    playerOne: {
      number: 1,
      shape: 'X'
    },
    playerTwo: {
      number: 2,
      shape: 'O'
    },

  }
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(players.playerOne)
  const [match, setMatch] = useState({
    vertical: false,
    horizontal: false,
    diagonal_left: false,
    diagonal_right: false
  })

  const [boardPlays, setBoardPlays] = useState([{ player: null, index: 1 },
  { player: null, index: 2 },
  { player: null, index: 3 },
  { player: null, index: 4 },
  { player: null, index: 5 },
  { player: null, index: 6 },
  { player: null, index: 7 },
  { player: null, index: 8 },
  { player: null, index: 9 },])


  useEffect(() => {
    const orientation = Object.entries(match).find(([key, value]) => value === true)
    if (orientation)
      setTimeout(() => {
        alert(`there is match ${orientation[0]}`)

      }, 500);

  }, [match])


  const checkMatchedRows = (rows, orientation) => {
    const checkIfPlayersAreEqual = (player, row) => player.number == row[0].player.number
    rows.forEach((row) => {
      const findMatch = row.every(({ player }) => player != null && checkIfPlayersAreEqual(player, row))
      if (findMatch) {
        setMatch({ ...match, [orientation]: true })
      }
    })
  }
  const getDiagonals = (rows) => {
    let diagonals = [[], []]

    rows.forEach((row, i1) => {
      row.forEach((player, i2) => {
        if (i1 == i2) diagonals[0][i1] = player
      })
    })

    rows.reverse().forEach((row, i1) => {
      row.forEach((player, i2) => {
        if (i1 == i2) diagonals[1][i1] = player
      })
    })

    return diagonals

  }
  const checkIfThereIsAWinner = (board) => {

    const boardSeparatedByRows = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)]
    const diagonals = getDiagonals(boardSeparatedByRows)
    checkMatchedRows(boardSeparatedByRows, 'horizontal')

    let verticalArray = [[], [], []]

    boardSeparatedByRows.forEach((rows, index) => {
      rows.forEach((player, secondIndex) => {
        verticalArray[secondIndex][index] = player
      })
    })

    checkMatchedRows(verticalArray, 'horizontal')
    checkMatchedRows([diagonals[0]], 'diagonal_left')
    checkMatchedRows([diagonals[1]], 'diagonal_right')

  }


  const handlePlayerClick = (index) => {
    if (currentPlayerTurn.number === 1) {
      let boardPlaysCopy = [...boardPlays]
      if (boardPlaysCopy[index].player) return

      boardPlaysCopy[index].player = players.playerOne

      setBoardPlays(boardPlaysCopy)
      setCurrentPlayerTurn(players.playerTwo)
      checkIfThereIsAWinner(boardPlaysCopy)
    } else {
      let boardPlaysCopy = [...boardPlays]
      if (boardPlaysCopy[index].player) return

      boardPlaysCopy[index].player = players.playerTwo


      setBoardPlays(boardPlaysCopy)
      setCurrentPlayerTurn(players.playerOne)
      checkIfThereIsAWinner(boardPlaysCopy)


    }

  }
  const configs = {
    vertical: 'rotate-90',
    horizontal: "rotate-30",
    diagonal: "rotate-45",
    right_diagonal: "-rotate-45"
  }
  return (
    <div className='App'>
      <div className='select-none relative' style={{
        width: 500,
        height: 500,
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}>
        {boardPlays.map((pos, index) => {
          return (
            <div key={index} onClick={() => handlePlayerClick(index)} className="bg-green-300  hover:bg-green-200 transition flex items-center justify-center relative">
              <div className='absolute top-0 left-0 pl-5 text-blue-900'>
                {pos.index}

              </div>
              <div className='text-3xl font-bold text-black/90'>
                {pos?.player?.shape}
              </div>
            </div>

          )
        }
        )}
        <div className='w-full h-1 absolute bg-red-500 top-1/2 rotate-90 translate-y-2'/>
      </div>
    </div>
  )
}

export default App
