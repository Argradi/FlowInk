import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
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

    const logOutUser = () => {
        localStorage.removeItem("authToken");

        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProviderWrapper };