import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function LoginPage() {
    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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

    return(
        <>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        Password:
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button>Login</button>
                </form>
                <Link to={"/signup"}>Sign Up</Link>
            </div>
        </>
    )
}

export default LoginPage