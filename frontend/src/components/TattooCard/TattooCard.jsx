import './TattooCard.css'

function TattooCard({tattoo}) {
    return(
        <div id="tattoo-card">
            <h3>{tattoo.userId}</h3>
            <img src={tattoo.image} />
            <h3>{tattoo.title}</h3>
        </div>
    )
}

export default TattooCard