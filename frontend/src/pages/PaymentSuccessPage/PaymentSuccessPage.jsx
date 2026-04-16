import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios"
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import './PaymentSuccessPage.css'

function PaymentSuccessPage() {
    const [searchParams] = useSearchParams()
    const tattooId = searchParams.get("id")

    const [tattoo, setTattoo] = useState(null)

    const getTattoo = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tattoos/${tattooId}`)
            .then((tattoo) => {
                setTattoo(tattoo.data)
            })
            .catch((err) => {
                console.log("Error al obtener el tatuaje", err)
            })
    }

    useEffect(() => {
        getTattoo()
    }, [tattooId])

    const handleDownload = () => {
        fetch(tattoo.image)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tattoo-${tattoo.title}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(err => console.error("Error al descargar:", err));
    };

    if (!tattoo)
        return <h3>Cargando tatuaje</h3>

    return (
        <div id="payment-container">
            <h1>✨ ¡Pago Completado con Éxito! ✨</h1>
            <p>Gracias por apoyar el arte del tatuaje</p>
            <h3>{tattoo.title}</h3>
            <img src={tattoo.image} alt={tattoo.title} />
            <div style={{ marginTop: '20px' }}>
                <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{ backgroundColor: "#4CAF50", marginRight: '10px' }}
                >
                    Descargar Diseño
                </Button>

                <Link to="/">
                    <Button variant="outlined" sx={{ color: "white", borderColor: "white" }}>
                        Volver al Inicio
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PaymentSuccessPage