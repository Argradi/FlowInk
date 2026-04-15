import "./Navbar.css"
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react"
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar() {
    const [open, setOpen] = useState(false);

    const { user, logOutUser } = useContext(AuthContext)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogout = () => {
        logOutUser();
        setOpen(false)
    };

    return (
        <div id="nav-container">
            <div id="navs">
                <Link to={"/"}><h2>Home</h2></Link>
                <Link to={"/add"}><h2>Add</h2></Link>
                <Link><h2>About</h2></Link>
            </div>
            {user ? (
                <>
                    <Button onClick={handleOpen}>
                        <LoginIcon sx={{ color: '#ffffff' }} />
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box>
                            <h2 id="child-modal-title">¿Desea cerrar sesion?</h2>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleLogout}>Si</Button>
                        </Box>
                    </Modal>
                </>
            ) : (
                <Link to={"/login"}>
                    <Button>
                        <PersonIcon sx={{ color: '#ffffff' }} />
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default Navbar