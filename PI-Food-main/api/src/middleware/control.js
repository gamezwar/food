const {Recipe, Diets } = require('../db.js')

const control = async (req, res, next) =>{

   const { name, summary , diets } = req.body;
   console.log(req.body);
   if(!name || !summary || !diets) return res.status(401).send({ error : 'faltan parametros' })
   let dietas;
   for(let i = 0; i < diets.length; i++){
       dietas = await Diets.findByPk(diets[i])
      if(!dietas) return res.status(404).send({ error : 'no existe dieta' })
  };
  if(!dietas) return res.status(404).send({ error : 'no existe dieta' })
     const crearModelo = await Recipe.create(req.body)
     await crearModelo.addDiets(diets)
      next();
}

module.exports = { control };
