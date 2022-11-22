const { Router } = require('express');
const router = Router();
const { Dieta } = require('../Controladores/index')


router.get('/', async (req, res)=>{
    try {
        const dietas = await Dieta() 
        res.status(200).json(dietas)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;