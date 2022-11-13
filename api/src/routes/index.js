const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getFromApi = require("../utils/getApi");
const getFromDb = require("../utils/getDB");
const {Dog, Temperament} = require("../db");
const axios = require('axios');
const express = require("express")


const router = Router();

async function getAllDogs(){
    const apiDogs = await getFromApi()
    const dbDogs = await getFromDb()
    const allDogs = apiDogs.concat(dbDogs)
    return allDogs
}

/* router.get("/dogs", async (req, res) => {
    const name = req.query.name
    const allDog = await getAllDogs()
        if (name){
            const exists = await allDog.filter((perro) => {
                perro.name.toLowerCase().includes(name.toLowerCase())
            })
            if (exists.length) return res.status(200).send(exists)
            else {
                return res.status(404).send("La raza ingresada no fue encontrada")
            }
        } return res.status(200).send(allDog)
}) */

router.get("/dogs", async(req, res) => {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const exists = allDogs.filter(perro => perro.name.toLowerCase().includes(name.toLowerCase()));
        exists.length ? res.status(200).send(exists) : res.status(404).send("La raza ingresada no fue encontrada"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:id", async(req, res) => {
    const { id } = req.params;
    const allDogs = await getAllDogs();
    const filter = allDogs.filter(perro => perro.id == id);
    filter.length ? res.status(200).send(filter) : res.status(404).send("Ese id no pertenece a ninguna raza");
})

router.get("/temperaments", async(req, res) => {
    const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const temperaments = await tempsApi.data.map(temp => temp.temperament);
    const temperament = await temperaments.toString().split(",");
    temperament.forEach(el => {
        Temperament.findOrCreate({
            where: {name: el}
        })
    });
    const allTemperaments = await Temperament.findAll()
    res.status(200).send(allTemperaments)
})

/*router.post("/dog", async (req, res) => {
    try {
      const {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpanMin,
        lifeSpanMax,
        temperament,
        img,
      } = req.body;
  
      const createdDog = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpanMin,
        lifeSpanMax,
        img:img ? img : "https://i.pinimg.com/originals/6b/52/bc/6b52bcbea6969ef1965dd775e424fc53.gif"
      });
      
      let temperamentDB = await Temperament.findAll({
        where: { name: temperament },
      });
      console.log(req.body)
  
      createdDog.addTemperament(temperamentDB);
  
      return res.status(201).send("Se creo correctamente");
    } catch (err) {
      //console.log("ERROR", err);
      console.log(req.body)

      res.status(404).json(err);
    }
  });*/

  /*No logre hacerlo con el post de arriba porque cada vez que mandaba un objeto el post nunca se hacia. Siempre quedaba en pending entonces con este post pase el objeto
    como string para por lo menos recibir la data. Despues fui seccionando la data para poder manejarla individualmente. Despues de eso corte la parte de los keys del objeto
    original y que solo queden los values originales mandados desde el formulario
  */

  router.post("/dog", async(req, res) => {
    try {
        const data = req.body
        var all = Object.keys(data)
        var obj = all[0].split(",")
        var values = Object.values(data)
        var tempsObj = Object.keys(values[0])

        const namE = obj[0].slice(8).replaceAll('"', '')
        const hMin = obj[1].slice(12).replaceAll('"', '')
        const hMax = obj[2].slice(12).replaceAll('"', '')
        const wMin = obj[3].slice(12).replaceAll('"', '')
        const wMax = obj[4].slice(12).replaceAll('"', '')
        const spanMin = obj[5].slice(14).replaceAll('"', '')
        const spanMax = obj[6].slice(14).replaceAll('"', '')
        const image = obj[7].slice(6).replaceAll('"', '')
        const temps = tempsObj[0].split(",")


        const createdDog = await Dog.create({
          name: namE,
          heightMin: hMin,
          heightMax: hMax,
          weightMin: wMin,
          weightMax: wMax,
          lifeSpanMin: spanMin,
          lifeSpanMax: spanMax,
          img:image ? image : "https://i.pinimg.com/originals/6b/52/bc/6b52bcbea6969ef1965dd775e424fc53.gif"
        });

        let temperamentDB = await Temperament.findAll({
            where: { name: temps },
          });

        createdDog.addTemperament(temperamentDB);
  
        return res.status(201).send("Se creo correctamente");
    }
    catch (err) {
        console.log("ERROR", err);
        res.status(404).json(err);
    }
  });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json)

module.exports = router;