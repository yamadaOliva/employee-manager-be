import { getGroups } from '../services/groupService.js';
const read  = async (req, res) => {
    try{
        let data = await getGroups();
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
        return res.status(500).json({
            EM : "something wrong",
            EC : -5,
            DT : ""
        })
    }
}
module.exports = {
    read
}