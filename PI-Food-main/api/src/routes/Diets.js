const { Router } = require('express');
const router = Router();
const { newDiets } = require('../Controladores/index')


router.get('/', async (req, res)=>{
    try {
        const diets = await newDiets() 
        res.status(200).json(diets)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;