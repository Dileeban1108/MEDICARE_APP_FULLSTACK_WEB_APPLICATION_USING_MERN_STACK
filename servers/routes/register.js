const express=require('express')
const router=express.Router()
const regiterController=require('../controllers/registerController')

router.post('/lecturerRegister',regiterController.handleNewLecturer)
router.post('/studentRegister',regiterController.handleNewUser)
router.post('/studentWelfareRegister',regiterController.handleNewStudentWelfare)

module.exports=router