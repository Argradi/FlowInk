import "./Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
    return(
        <div id="nav-container">
            <div id="navs">
                <Link to={"/"}><h2>Home</h2></Link>
                <Link><h2>Add</h2></Link>
                <Link><h2>About</h2></Link>
            </div>
            <h1>Header</h1>
        </div>
    )
}

export default Navbar