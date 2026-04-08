import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
