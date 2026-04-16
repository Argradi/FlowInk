import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './SignUpPage.css'

function SignUpPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            email: email,
            password: password,
            name: name
        }

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/signup`, newUser)
            .then((user) => {
                console.log("Registro con exito de", user.data.user.name)
                navigate("/login")
            })
            .catch((err) => console.log("Error al hacer signup:", err.response?.data?.message))
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
                <h2>Sign Up</h2>

                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF8A8A" }}>
                    Sign Up
                </Button>
            </Box>
        </div>
    )
}

export default SignUpPage