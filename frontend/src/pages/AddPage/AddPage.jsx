import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddPage() {
    const navigate = useNavigate()

    const [ title, setTitle ] = useState()
    const [ image, setImage ] = useState()
    const [ description, setDescription ] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTattoo = { title, description, image }

        const localToken = localStorage.getItem("authToken")

        axios
            .post("http://localhost:5005/api/tattoos", newTattoo, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("Tatuaje publicado correctamente:", response.data)
                navigate("/")
            })
            .catch((err) => console.log("Error al publicar un nuevo tatuaje", err))
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="text"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <button>Publicar</button>
            </form>
        </>
    )
}

export default AddPage