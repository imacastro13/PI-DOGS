const {Dog} = require("../db")
const {Temperament} = require("../db")

module.exports = async function getFromDb() {
    const dbData = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    }); return dbData
}