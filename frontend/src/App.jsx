import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage"
import DetailsPage from "./pages/DetailsPage/DetailsPage"
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import AddPage from "./pages/AddPage/AddPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/tattoo/:tattooId" element={<DetailsPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/add" element={<AddPage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
