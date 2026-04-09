import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function DetailsPage() {
    const [ tattoo, setTattoo ] = useState(null)

    const { tattooId } = useParams()

    const getTattoo = () => {
        axios
            .get(`http://localhost:5005/api/tattoos/${tattooId}`)
            .then((tattoo) => {
                setTattoo(tattoo.data)
            })
            .catch((err) => {
                console.log("Error al obtener el tatuaje", err)
            })
    }

    useEffect(() => {
        getTattoo()
    }, [tattooId])

    if(!tattoo)
        return <h3>Cargando tatuaje</h3>

    return(
        <div>
            <h1>Details Page</h1>
            <h3>{tattoo.title}</h3>
        </div>
    )
}

export default DetailsPage