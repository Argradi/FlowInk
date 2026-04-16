import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import './EditPage.css'

function AddPage() {
    const navigate = useNavigate()

    const [tattoo, setTattoo] = useState({})

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

    return (
        <div className='form-container'>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '50%',
                    minWidth: '300px'
                }}
            >
                <h3>Edit</h3>
                <TextField
                    className="add-field"
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={tattoo.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInputLabel-root": { color: "gray" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&.Mui-focused fieldset": { borderColor: "#FF8A8A" },
                        },
                    }}
                />
                <TextField
                    className="add-field"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={tattoo.description}
                    onChange={handleChange}
                    required
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
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF8A8A" }}>
                    Editar
                </Button>
            </Box>
        </div>
    )
}

export default AddPage