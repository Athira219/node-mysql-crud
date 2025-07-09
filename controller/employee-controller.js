const express = require('express');

const router = express.Router()
const db = require('../db')

const employeeService = require('./service/employee-service')

router.get('/',async(req,res)=>{
    const employees = await employeeService.allEmployeeList()
    res.send(employees)
})
router.get('/:id',async(req,res)=>{
    const employee = await employeeService.employeeById(req.params.id)
    if(employee.length == 0){
        res.status(404).json({ message: 'No record with given id: ' + req.params.id });
    }else
    res.send(employee)
})
router.delete('/:id',async(req,res)=>{
    const affectedRows = await employeeService.deleteEmployee(req.params.id)    
    if(affectedRows == 0){
       res.status(404).json({ message: 'No record with given id: ' + req.params.id });
    }else
    res.send('Employee deleted successfully.')
})
router.post('/',async(req,res)=>{
     await employeeService.addOrEditEmployee(req.body)    
    
    res.status(201).send('Employee create successfully.')
})
router.put('/:id',async(req,res)=>{
    const affectedRows = await employeeService.addOrEditEmployee(req.body,req.params.id)    
    if(affectedRows == 0){
       res.status(404).json({ message: 'No record with given id: ' + req.params.id ,});
    }else
    res.send('Employee update successfully.')
})

module.exports = router;