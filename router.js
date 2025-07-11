const express = require('express')
const router = express.Router()

const employeeROute = require('./controller/employee-controller')

router.use('/employeeList',employeeROute) 

module.exports = router