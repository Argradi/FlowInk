import "./Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
    return(
        <div id="nav-container">
            <div id="navs">
                <Link>Home</Link>
                <h2>Add</h2>
                <h2>About</h2>
            </div>
            <h1>Header</h1>
        </div>
    )
}

export default Navbar