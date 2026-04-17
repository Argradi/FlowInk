import { useEffect, useState, useContext } from "react"
import TattooCard from "../../components/TattooCard/TattooCard"
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './HomePage.css'
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { AuthContext } from "../../context/auth.context";

function HomePage() {
    const navigate = useNavigate()
    const localToken = localStorage.getItem("authToken")
    const { user } = useContext(AuthContext)

    const [tattoos, setTattoos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getTattoos = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tattoos`)
            .then((tattoo) => {
                setTattoos(tattoo.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('Error alobtener los tatuajes:', err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getTattoos()
    }, [])

    const handleBuyButton = () => {

        if (!localToken) {
            alert("No puedes añadir un tatuaje: Debes iniciar sesión primero.");
            return;
        }

        navigate('/add')
    }

    return (
        <div id="home-page">
            {isLoading ? (
                <Skeleton animation="wave" variant="rounded" height={290} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
            ) : (
                tattoos.map((tattoo) => {
                    return (
                        <TattooCard key={tattoo.id} tattoo={tattoo} />
                    )
                })
            )
            }
            {user && (
                <IconButton className="floating-button" onClick={handleBuyButton}>
                    <AddIcon />
                </IconButton>
            )}
        </div>
    )
}

export default HomePage