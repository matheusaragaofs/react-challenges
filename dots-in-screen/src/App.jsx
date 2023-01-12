import './App.css'
import React, { useMemo, useState } from 'react'

function App() {
  const [dots, setDots] = useState([])
  const [deletedDots, setDeletedDots] = useState([])

  const handleMouseClick = (event) => {
    const dot = { x: event.clientX, y: event.clientY }
    setDots([...dots, dot])
  }


  const mainComponent = useMemo(() => {

    return <div onClick={handleMouseClick} className='root' style={{
      position: 'relative',
      height: '100%',
      userSelect: 'none',
      width: '100%',
    }}>
      <div style={{
        width:300,
        margin:'auto',
        justifyContent:'space-evenly',
        padding:10,
        display:'flex'
      }}>

        <button onClick={(e) => {
          e.stopPropagation()
          let dotsCopy = [...dots]
          const deletedDot = dotsCopy.pop()
          setDeletedDots([...deletedDots, deletedDot])
          setDots(dotsCopy)

        }} >undo</button>
        <button onClick={(e) => {
          e.stopPropagation()
          if (deletedDots.length > 0 && dots.length > 0) {
            const deletedDotCopy = [...deletedDots]
            const lastDeletedDot = deletedDotCopy.pop()
            setDeletedDots(deletedDotCopy)
            setDots([...dots, lastDeletedDot])
          }

        }}>redo</button>
      </div>

      {dots?.map((dot, index) => (
        <div

          key={`${dot?.x} - ${index}`} style={{
            width: 10,
            borderRadius: '50%',
            height: 10,
            backgroundColor: '#76ff06',
            position: 'absolute',
            transform: `translate(${dot?.x}px, ${dot?.y - 50}px)`
          }} />


      ))}
    </div>
  }

    , [dots, deletedDots])
  return mainComponent
}

export default App
