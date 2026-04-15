import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AddPage() {
    const navigate = useNavigate()

    const [ tattoo, setTattoo ] = useState({})

    const { tattooId } = useParams()

    const getTattoo = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tattoos/${tattooId}`)
            .then((tattoo) => {
                setTattoo(tattoo.data)
            })
            .catch((err) => console.log("Error al obtener el tatuaje:", err))
    }

    useEffect(() => {
        getTattoo()       
    }, [tattooId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setTattoo({
            ...tattoo,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const localToken = localStorage.getItem("authToken")

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/tattoos/${tattooId}`, tattoo, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("Tatuaje editado correctamente:", response.data)
                navigate(`/tattoo/${tattooId}`)
            })
            .catch((err) => {
                console.log("Error al editar el tatuaje", err.response.data.message)
                alert("Error al editar el tatuaje: " + err.response.data.message)
            })
    }

    return(
        <>
            <h3>AddPage</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={tattoo.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        type="text"
                        name="description"
                        value={tattoo.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="text"
                        name="image"
                        value={tattoo.image}
                        onChange={handleChange}
                    />
                </label>
                <button>Editar</button>
            </form>
        </>
    )
}

export default AddPage