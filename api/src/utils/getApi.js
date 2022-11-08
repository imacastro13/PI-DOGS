const axios = require("axios");

module.exports = async function getFromApi(){
    const apiLink = await axios.get(`https://api.thedogapi.com/v1/breeds`)
    const apiData = await apiLink.data.map(perro => {
        return {
            id: perro.id,
            name: perro.name,
            weight: perro.weight.metric,
            height: perro.height.metric,
            lifeSpan: perro.life_span,
            temperament: [perro.temperament]
                .join()
                .split(",")
                .map(perro => perro.trim()),
            img: perro.image.url,
        };
    }); return apiData
}