import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CommentPage() {
    const navigate = useNavigate()

    const [ text, setText ] = useState("")

    const { tattooId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const localToken = localStorage.getItem("authToken")

        axios
            .post(`http://localhost:5005/api/tattoos/${tattooId}/comments`, { text }, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("comentario añadido correctamente:", response.data)
                navigate(`/tattoo/${tattooId}`)
            })
            .catch((err) => {
                console.log("Error al añadir el comentario:", err.response.data.message)
                alert("Error al añadir el comentario: " + err.response.data.message)
            })
    }

    return(
        <>
            <h3>Comment Page</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Text:
                    <textarea
                        type="text"
                        name="description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </label>
                <button>Comment</button>
            </form>
        </>
    )
}

export default CommentPage