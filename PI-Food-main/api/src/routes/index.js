const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getRecipes, idRecipes, createRecipe } = require('../Controladores/index');
const { control } = require('../middleware/control');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res)=>{
   const { name } = req.query;
   try {
    const recipes = await getRecipes(name)
      res.status(200).json(recipes)     
   } catch (error) {
    res.status(400).send(error.message)
   }
})


router.get('/:idRecet',async (req, res) =>{
    const { idRecet } = req.params;
    try {
         const detail = await idRecipes(idRecet)
         res.status(200).json(detail)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', control, async (req, res)=>{
    try { 
        const create = await createRecipe(req.body)
        res.status(200).json(create)   
    } catch (error) {}
})

module.exports = router;