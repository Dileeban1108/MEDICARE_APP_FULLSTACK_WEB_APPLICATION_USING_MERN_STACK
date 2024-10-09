const express=require('express')
const router=express.Router()
const regiterController=require('../controllers/registerController')
 
router.post('/newDoctor',regiterController.handleNewDoctor)
router.put('/update',regiterController.updateDoctor)

module.exports=router