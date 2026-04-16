import { Link } from 'react-router-dom'
import './TattooCard.css'

function TattooCard({tattoo}) {

    return(
        <Link to={`/tattoo/${tattoo._id}`} id="tattoo-card">
            <img src={tattoo.image} className={tattoo.isSelling ? "blurred-image" : ""}/>
        </Link>
    )
}

export default TattooCard