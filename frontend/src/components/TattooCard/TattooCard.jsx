import { Link } from 'react-router-dom'
import './TattooCard.css'

function TattooCard({tattoo}) {

    return(
        <Link to={`/tattoo/${tattoo._id}`} id="tattoo-card">
            <h3>{tattoo.userId.name}</h3>
            <img src={tattoo.image} />
            <h3>{tattoo.title}</h3>
        </Link>
    )
}

export default TattooCard