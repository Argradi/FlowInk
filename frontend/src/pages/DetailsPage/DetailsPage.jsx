import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context";

function DetailsPage() {
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const [tattoo, setTattoo] = useState(null)

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

    const deleteTatto = () => {
        const localToken = localStorage.getItem("authToken")

        axios
            .delete(`http://localhost:5005/api/tattoos/${tattooId}`, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("Tatuaje eliminado con exito:", response)
                navigate("/")
            })
            .catch((err) => {
                console.log("Error al borrar el tatuaje:", err.response.data.message)
                alert("Error al borrar el tatuaje: " + err.response.data.message)
            })
    }

    if (!tattoo)
        return <h3>Cargando tatuaje</h3>

    return (
        <div>
            <h1>Details Page</h1>
            <h3>{tattoo.title}</h3>
            {user && user._id === tattoo.userId &&(
                <>
                    <button onClick={deleteTatto}>Borrar</button>
                    <Link to={`/edit/${tattooId}`}>
                        <button>Editar</button>
                    </Link>
                </>
            )}
        </div>
    )
}

export default DetailsPage