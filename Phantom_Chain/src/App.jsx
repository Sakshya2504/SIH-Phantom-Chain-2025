import {React} from 'react'
function App() {

  const print = async (e)=>{
    const res = await fetch('http://localhost:3000/api/health')
    const data = await res.text();
    console.log(data)
    alert(data)
  }
  return (
    <>
      <div>
        <button onClick={print}>Hello Everyone!</button>
      </div>
    </>
  )
}

export default App
