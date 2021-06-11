import Express from 'express';
import bodyParser from 'body-parser'
import path from 'path'
import mysql from 'mysql'
import mysqlConnection from './connection.js'
import {showClients,showClientsbyID,showClientsbyNumber,updateClient,deleteClient,insertClient,showClientsbyName} from './controllers/clientController.js'
import {showUsers,insertUser} from './controllers/userController.js'
import cors from 'cors'
const app = Express();
const port = 3001
app.use(Express.json())
app.use(cors());
    
app.use(Express.json())
//#region ------------------- CRUD CLIENTS ----------------------

//#region  ---------- GETS CLIENTS ----------
app.get('/client/getClient', showClients);

//PASAR PARAMETROS VIA 
app.get('/client/getClientID/:id', showClientsbyID);

app.get('/client/getClientName/:name', showClientsbyName);
app.get('/client/getClientNumber/:number', showClientsbyNumber);
app.use(Express.urlencoded({extended:true}))
//#endregion
//#region ---------- Update CLIENTS ----------
app.put('/client/updateClient', updateClient);
//#endregion
//#region ---------- Delete CLIENTS ----------
app.delete('/client/deleteClient/:id', deleteClient);
//#endregion
//#region ---------- Insert CLIENTS ----------
app.post('/client/insertClient', insertClient);
//#endregion
//#endregion

//#region ------------------- CRUD USERS ----------------------
app.get('/users/getUsers', showUsers);

//#endregion
//#region ---------- Insert USERS ----------
app.post('/users/insertUser', insertUser);
//#endregion



app.listen(port,()=>{console.log("Listeingn on port "+port)})
