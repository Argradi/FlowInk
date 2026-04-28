const analyzeTattooImage = (image) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const prompt = `
        Analiza esta imagen de un diseño de tatuaje y devuelve exclusivamente un objeto JSON (sin markdown, sin texto extra) con esta estructura:
        {
            "estilo": "Uno de estos: Realismo, Tradicional, Fine Line, Blackwork, Minimalista, Japonés, Tribal o Ilustrativo",
            "tiempo": "Una estimación como '1-2 horas', '3-5 horas' o 'Sesión completa'",
            "tags": ["array con 4 palabras clave"],
            "descripcion": "una frase comercial de máximo 15 palabras"
        }
    `;

    console.log("Analizando imagen desde URL:", image);

    return fetch(image)
        .then(res => {
            if (!res.ok) throw new Error("Error al descargar la imagen de Cloudinary");
            return res.arrayBuffer();
        })
        .then(buf => {
            const base64Data = Buffer.from(buf).toString('base64');

            const payload = {
                contents: [{
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: base64Data
                            }
                        }
                    ]
                }]
            };

            return fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error("Error de la API de Google:", data.error.message);
                throw new Error(data.error.message);
            }

            const responseText = data.candidates[0].content.parts[0].text;
            
            const cleanJson = responseText.replace(/```json|```/g, "").trim();
            
            return JSON.parse(cleanJson);
        })
        .catch(error => {
            console.error("Error final en el servicio de IA:", error.message);
            throw error;
        });
};

module.exports = { analyzeTattooImage };