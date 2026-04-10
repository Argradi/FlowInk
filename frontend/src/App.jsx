import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage"
import DetailsPage from "./pages/DetailsPage/DetailsPage"
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import AddPage from "./pages/AddPage/AddPage"
import EditPage from "./pages/EditPage/EditPage"

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
        <Route path="/edit/:tattooId" element={<EditPage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
