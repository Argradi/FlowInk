import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get("http://localhost:5005/auth/verify", {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                const user = response.data;
                setUser(user);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
            });
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, authenticateUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProviderWrapper };