import db from '../models/index.js';
const getGroups =async ()=>{
    try{
        let data = await db.Group.findAll();
        return{
            EM:"success",
            EC:200,
            DT:data
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getGroups
}