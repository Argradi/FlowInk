import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import './DetailsPage.css'

function DetailsPage() {
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const localToken = localStorage.getItem("authToken")

    const [tattoo, setTattoo] = useState(null)
    const [likes, setLikes] = useState([])
    const [text, setText] = useState("")

    const { tattooId } = useParams()

    const getTattoo = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tattoos/${tattooId}`)
            .then((tattoo) => {
                setTattoo(tattoo.data)
                setLikes(tattoo.data.likes)
            })
            .catch((err) => {
                console.log("Error al obtener el tatuaje", err)
            })
    }

    useEffect(() => {
        getTattoo()
    }, [tattooId])

    const deleteTatto = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/tattoos/${tattooId}`, {
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

    const likeTattoo = () => {
        axios
            .post(`http://localhost:5005/api/tattoos/${tattooId}/likes`, {}, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((likes) => {
                setLikes(likes.data.likes)
            })
            .catch((err) => console.log("Error al dar like al tatuaje:", err.response.data.message))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const localToken = localStorage.getItem("authToken")

        axios
            .post(`http://localhost:5005/api/tattoos/${tattooId}/comments`, { text }, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("comentario añadido correctamente:", response.data)
                getTattoo()
            })
            .catch((err) => {
                console.log("Error al añadir el comentario:", err.response.data.message)
                alert("Error al añadir el comentario: " + err.response.data.message)
            })
    }

    if (!tattoo)
        return <h3>Cargando tatuaje</h3>

    return (
        <div id="details-page">
            <div id="img-container">
                <img src={tattoo.image} />
            </div>
            <div id="info-container">
                <h3>{tattoo.userId.name}</h3>
                <h2>{tattoo.title}</h2>
                <hr />
                <p>{tattoo.description}</p>
                {user && user._id === tattoo.userId._id && (
                    <>
                        <button onClick={deleteTatto}>Borrar</button>
                        <Link to={`/edit/${tattooId}`}>
                            <button>Editar</button>
                        </Link>
                    </>
                )}
                <hr />
                <h2>Comentarios ({tattoo.comments.length})</h2>
                <form onSubmit={handleSubmit} id="comment">
                    <TextField
                        id="comment-field"
                        label="Deja tu comentario"
                        variant="outlined"
                        name="description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                        multiline
                        sx={{
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiInputLabel-root": { color: "gray" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "#FF8A8A" },
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment >
                                        <IconButton
                                            type="submit"
                                            edge="end"
                                            sx={{
                                                color: "#FF8A8A",
                                            }}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </form>

                <button onClick={likeTattoo}>Like {likes.length}</button>
                <div>
                    {tattoo.comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <h4>{comment.userId.name}</h4>
                                <h3>{comment.text}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailsPage