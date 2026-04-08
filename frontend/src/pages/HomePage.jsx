import { useEffect, useState } from "react"
import TattooCard from "../components/TattooCard/TattooCard"
import axios from 'axios'
import './HomePage.css'

function HomePage() {

    const [ tattoos, setTattoos ] = useState([])

    const getTattoos = () => {
        axios
            .get('http://localhost:5005/api/tattoos')
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

    return(
        <div id="home-page">
            {tattoos.map((tattoo) => {
                return(
                    <TattooCard key={tattoo.id} tattoo={tattoo}/>
                )
            })}
        </div>
    )
}

export default HomePage