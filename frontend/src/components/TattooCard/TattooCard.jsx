import { Link } from 'react-router-dom'
import './TattooCard.css'

function TattooCard({tattoo}) {

    const getWatermarkedUrl = (url) => {
        if (!url) return "";
        
        const transformation = "l_cooltext506879056561067_zfjdwi,o_50,w_600/fl_layer_apply";
        
        return url.replace('/upload/', `/upload/${transformation}/`);
    }

    console.log(getWatermarkedUrl(tattoo.image))

    return(
        <Link to={`/tattoo/${tattoo._id}`} id="tattoo-card">
            <img src={tattoo.isSelling ? getWatermarkedUrl(tattoo.image) : tattoo.image}/>
        </Link>
    )
}

export default TattooCard