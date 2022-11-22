require('dotenv').config();
const { API_KEY2 } = process.env;
const axios = require('axios')
const { Recipe, Diets } = require('../db.js')
const newJson = require('../../api.json');
const { Op } = require('sequelize');

const getRecipes =async (name) =>{
    const api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`;

     const apiKey = await axios.get(api);               
    let fill = apiKey.data.results;
    // let fill = newJson.results
    let nevoFill = fill.map((n)=> {
        return{
            id : n.id,
            name : n.title,
            summary : n.summary && n.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            healthScore : n.healthScore,
            analyzedInstructions : n.analyzedInstructions[0] ? n.analyzedInstructions[0].steps.map(x => x.step) : [],
            dishTypes : n.dishTypes[0] ? n.dishTypes : [],
            image : n.image,
            diets : n.diets[0] ? n.diets : ['no faund']
        }
    })

   const dataName = nevoFill.filter((x) => {
        if(typeof(name) === 'string') name = name.toLowerCase();
        return x.name.toLowerCase().includes(name)
    });
    
    const baseDatos = await Recipe.findAll({
        include : { model : Diets, attributes : ['name'] }
    })
    let newBase = baseDatos.map(n => {
        return{
            id : n.id,
            name : n.name,
            summary : n.summary && n.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            healthScore : n.healthScore,
            analyzedInstructions : n.analyzedInstructions,
            // dishTypes : dishTypes[0] ? n.dishTypes : [],
            image : n.image,
            diets : n.diets.map(x => x.name)
        }
    })
    const union = [...nevoFill, ...newBase];
    if(!name) return union;
   const DB = await Recipe.findAll({ where: { name : {[Op.iLike]: `%${name}%`} }, include: [{model: Diets }] }); 
   const newDB = DB.map(n =>{
    return{
        id : n.id,
        name : n.name,
        summary : n.summary && n.summary.replace(/<\/?[^>]+(>|$)/g, ""),
        healthScore : n.healthScore,
        analyzedInstructions : n.analyzedInstructions,
        image : n.image,
        diets : n.diets.map(x => x.name)
    }
})   

     if(!dataName.length && !DB.length){
        throw Error('No se encontro resultado de su busqueda')
     }

     return [...dataName, ...newDB]
}

const idRecipes = async (id) =>{
const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`
   const detail = await axios.get(url)
let bd;
let detalle = detail.data;
// let detalle;
if(isNaN(Number(id))){
    bd = await Recipe.findByPk(id, {
        include : { model : Diets, attributes : ['name'] }
    });
    const newBd = {
        id : bd.id,
        name : bd.name,
        summary : bd.summary && bd.summary.replace(/<\/?[^>]+(>|$)/g, ""),
        healthScore : bd.healthScore,
        analyzedInstructions : bd.analyzedInstructions,
        image : bd.image,
        diets : bd.diets.map(x => x.name),
    }

    if(bd) return newBd;
}else{
    //  detalle = newJson.results.find((x) => x.id == id)
    if(detalle){
        const detalleId = {
            id : detalle.id,
            name : detalle.title,
            summary : detalle.summary && detalle.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            healthScore : detalle.healthScore,
            analyzedInstructions : detalle.analyzedInstructions[0] ?
            detalle.analyzedInstructions[0].steps.map(x => x.step) : ['not faund'],
            image : detalle.image,
            diets : detalle.diets,
        }
        return detalleId;
    }

}
if(!detalle && !bd) throw Error( `no se encuetra ninguna relacion con el ${id}`)
};

const createRecipe = async () =>{
return 'Se creo correctamente';

};

const Dieta = async () =>{
    const api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`;
    const apiKey = await axios.get(api)                  
    const fill = apiKey.data.results.map((D) => D.diets)
    let arrDiets = []
    // let fill = newJson.results.map(x => x.diets)
    for(const x in fill){
        for(let i of fill[x]){
            arrDiets.push(i)
        }
    } 
    const newDiets = [...new Set(arrDiets)];
    const dietas = await Diets.findAll();
if(!dietas.length){
    const newDieta = newDiets.map(x => Diets.create({ name : x }))
     await Promise.all(newDieta);
     return await Diets.findAll();
}
    return dietas
}

module.exports ={
    getRecipes,
    idRecipes,
    createRecipe,
    Dieta,
}