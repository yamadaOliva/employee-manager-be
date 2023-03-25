import Sequelize from 'sequelize';

const sequelize = new  Sequelize('learn','root',null,{
    host: 'localhost',
    dialect: 'mysql',
})

const connection = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(err){
        console.log('Unable to connect to the database:', err);
    }
}

export default connection;