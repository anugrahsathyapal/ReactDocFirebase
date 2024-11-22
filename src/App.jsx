import { Route, Routes } from 'react-router-dom'
import './App.css'
import DocEditor from './assets/components/DocEditor'
import Home from './assets/pages/Home'
import Pnf from './assets/pages/Pnf'
import DocAdd from './assets/components/DocAdd'

function App() {
 

  return (
    <>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<DocAdd />} />
        <Route path="/edit/:docId" element={<DocEditor />} />
        <Route path="*" element={<Pnf />} />
      </Routes>
      
 
      
    </>
  )
}

export default App
