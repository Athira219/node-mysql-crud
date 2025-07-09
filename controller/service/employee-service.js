const db = require('../../db')

module.exports.allEmployeeList = async ()=>{
const [row]= await db.query('SELECT * FROM employes')
    return row;
}

module.exports.employeeById = async (id)=>{
const [row]= await db.query('SELECT * FROM employes WHERE id = ?',[id])
    return row;
}

module.exports.deleteEmployee = async (id)=>{
const [{affectedRows}]= await db.query('DELETE FROM employes WHERE id = ?',[id])
    return affectedRows;
}
module.exports.addOrEditEmployee = async (obj,id = 0)=>{
const [[[{affectedRows}]]]= await db.query('CALL employe_add_or_update(?,?,?,?)',
    [id,obj.name,obj.empoyee_code,obj.salary])
    return affectedRows;
}