import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUpPage() {
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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

    return(
        <>
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        Name:
                        <input 
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Email:
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Password:
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage