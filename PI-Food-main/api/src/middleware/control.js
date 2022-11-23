const {Recipe, Diets } = require('../db.js')

const control = async (req, res, next) =>{

   const { name, summary , diets } = req.body;
   console.log(req.body);
   if(!name || !summary || !diets) return res.status(401).send({ error : 'missing parameters' })
   let diet;
   for(let i = 0; i < diets.length; i++){
       diet = await Diets.findByPk(diets[i])
      if(!diet) return res.status(404).send({ error : 'there is no diet' })
  };
  if(!diet) return res.status(404).send({ error : 'there is no diet' })
     const createModels = await Recipe.create(req.body)
     await createModels.addDiets(diets)
      next();
}

module.exports = { control };
