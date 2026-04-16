import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email: email,
            password: password,
        }

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/login`, user)
            .then((response) => {
                localStorage.setItem("authToken", response.data.authToken)
                authenticateUser()
                navigate("/")
            })
            .catch((err) => console.log("Error al hacer login:", err.response?.data?.message))
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
                <h2>Login</h2>
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
                    Login
                </Button>
            </Box>

            <Link to={"/signup"}>
                <Button>
                    Sign Up
                </Button>
            </Link>
        </div>
    )
}

export default LoginPage