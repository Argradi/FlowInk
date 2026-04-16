import { useEffect, useState } from "react"
import TattooCard from "../../components/TattooCard/TattooCard"
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './HomePage.css'
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate()

    const [tattoos, setTattoos] = useState([])

    const getTattoos = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tattoos`)
            .then((tattoo) => {
                setTattoos(tattoo.data)
            })
            .catch((err) => {
                console.log('Error alobtener los tatuajes:', err)
            })
    }

    useEffect(() => {
        getTattoos()
    }, [])

    return (
        <div id="home-page">
            {tattoos.map((tattoo) => {
                return (
                    <TattooCard key={tattoo.id} tattoo={tattoo} />
                )
            })}
            <IconButton className="floating-button" onClick={() => {navigate('/add')}}>
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default HomePage