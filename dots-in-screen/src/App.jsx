import './App.css'
import React, { useEffect, useState } from 'react'

function App() {
  const [positions, setPositions] = useState([])


  const handleMouseClick = (event) => {
    const position = { x: event.clientX, y: event.clientY, color: random_hex_color_code() }
    setPositions([...positions, position])
  }

  const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

  console.log(random_hex_color_code())

  return (
    <div onClick={handleMouseClick} className='root' style={{
      position: 'relative',
      height: '100%',
      userSelect: 'none',
      width: '100%',
      border: '1px solid'
    }}>
      <button onClick={(e) => {
        e.stopPropagation()
        positions.pop()
        
      }} >desfazer</button>
      <button onClick={(e) => {
        e.stopPropagation()
      }}>refazer</button>
      <br />
      {positions.map((position, index) => (
        <div

          key={`${position.x} - ${index}`} style={{
            width: 10,
            borderRadius: '50%',
            height: 10,
            backgroundColor: position.color,
            position: 'absolute',
            transform: `translate(${position.x}px, ${position.y - 50}px)`
          }} />


      ))}
    </div>
  )
}

export default App
