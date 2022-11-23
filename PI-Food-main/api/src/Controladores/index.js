require('dotenv').config();
const { API_KEY2 } = process.env;
const axios = require('axios')
const { Recipe, Diets } = require('../db.js')
const newJson = require('../../api.json');
const { Op } = require('sequelize');

const getRecipes =async (name) =>{
    // const api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`;

    //  const apiKey = await axios.get(api);               
    // let newFilters = apiKey.data.results;
    let newFilters = newJson.results
    let newFilter = newFilters.map((n)=> {
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

   const dataName = newFilter.filter((x) => {
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
            image : n.image,
            diets : n.diets.map(x => x.name)
        }
    })
    const union = [...newFilter, ...newBase];
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
    let data;
    if(isNaN(Number(id))){
        data = await Recipe.findByPk(id, {
            include : { model : Diets, attributes : ['name'] }
        });
        if(data === null) throw Error( `No relation to ${id} found`)
    const newData = {
        id : data.id,
        name : data.name,
        summary : data.summary && data.summary.replace(/<\/?[^>]+(>|$)/g, ""),
        healthScore : data.healthScore,
        analyzedInstructions : data.analyzedInstructions,
        image : data.image,
        diets : data.diets.map(x => x.name),
    }
    
    if(data) return newData;
}

let details;
if(typeof Number(id) === 'number'){
    // const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`
    // const detail = await axios.get(url)
    //  details = detail.data;
     details = newJson.results.find((x) => x.id == id)
     if(!details) throw Error( `No relation to ${id} found`);
    if(details){
        const detailsId = {
            id : details.id,
            name : details.title,
            summary : details.summary && details.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            healthScore : details.healthScore,
            analyzedInstructions : details.analyzedInstructions[0] ?
            details.analyzedInstructions[0].steps.map(x => x.step) : ['not faund'],
            image : details.image,
            diets : details.diets,
        }
        return detailsId;
    }

}
};

const createRecipe = async () =>{
return 'It was created correctly';

};

const newDiets = async () =>{
    // const api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`;
    // const apiKey = await axios.get(api)                  
    // const newFilters = apiKey.data.results.map((D) => D.diets)
    let arrDiets = []
    let newFilters = newJson.results.map(x => x.diets)
    for(const x in newFilters){
        for(let i of newFilters[x]){
            arrDiets.push(i)
        }
    } 
    const newDiets = [...new Set(arrDiets)];
    const diets = await Diets.findAll();
if(!diets.length){
    const newDiet = newDiets.map(x => Diets.create({ name : x }))
     await Promise.all(newDiet);
     return await Diets.findAll();
}
    return diets
};

module.exports ={
    getRecipes,
    idRecipes,
    createRecipe,
    newDiets,
}