//CONNEXION STRING 
import mysql from 'mysql'

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pruebatecnica",
    multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connection Succes");
    }
    else{
        console.log("Connection Failed"+err);
    }
})
export default mysqlConnection;