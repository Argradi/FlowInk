import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './AddPage.css'

function AddPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [description, setDescription] = useState()
    const [isSelling, setIsSelling] = useState(false)
    const [price, setPrice] = useState(0)
    const [isUploading, setIsUploading] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0]

        setIsUploading(true)

        const uploadData = new FormData()
        uploadData.append("image", file)

        const localToken = localStorage.getItem("authToken");

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/upload`, uploadData, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                setImage(response.data.fileUrl);
                setIsUploading(false);
            })
            .catch((err) => {
                console.log("Error al subir la imagen:", err);
                setIsUploading(false);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTattoo = {
            title,
            description,
            image,
            isSelling,
        }

        if (isSelling) {
            newTattoo.price = Number(price);
        }

        const localToken = localStorage.getItem("authToken")

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/tattoos`, newTattoo, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
            .then((response) => {
                console.log("Tatuaje publicado correctamente:", response.data)
                navigate("/")
            })
            .catch((err) => console.log("Error al publicar un nuevo tatuaje", err))
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="add-container">
                <div id="add-img">
                    <label>
                        Image:
                        <input
                            type="file"
                            onChange={handleImage}
                            accept="image/*"
                        />
                    </label>
                </div>
                <div id="add-text">
                    <TextField
                        className="add-field"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <FormControlLabel control={
                            <Switch 
                                checked={isSelling}
                                onChange={(e) => setIsSelling(e.target.checked)} 
                            />
                        } label="Sell" 
                    />
                    {isSelling && (
                        <TextField
                            className="add-field"
                            label="Precio (€)"
                            type="number"
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            fullWidth
                            slotProps={{ htmlInput: { min: 0.5, step: 0.01 } }}
                            sx={{
                                marginBottom: "20px",
                                "& .MuiInputBase-input": { color: "white" },
                                "& .MuiInputLabel-root": { color: "gray" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "#FF8A8A" },
                                },
                            }}
                        />
                    )}
                    <Button type="submit" variant="contained" disabled={isUploading || !image} sx={{ backgroundColor: "#FF8A8A" }}>
                        {isUploading ? "Subiendo imagen..." : "Publicar"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddPage