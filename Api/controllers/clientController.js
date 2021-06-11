import mysqlConnection from "../connection.js";
import Client from "../models/client.js";

const showClients = async (req, res) => {
    
    mysqlConnection.query('SELECT * FROM client', (error, result) => {
        if (error) throw error;
        res.send(result)
    })

};


const showClientsbyID = async (req, res) => {
    const id = req.params.id
    mysqlConnection.query('SELECT * FROM client where idClient =' + id, (error, result) => {
        if (error) throw error;
        res.send(result)
    })

};
const showClientsbyName = async (req, res) => {
    const name = req.params.name
    let client = ClientDTO
    let clients = []
    mysqlConnection.query('SELECT * FROM client where name like \"%' + name +'%\"', (error, result) => {
        result.forEach(element => {
            client = {
                "idClient": element.idClient,
                "number": element.number,
                "name": element.name,
                "phone": element.phone,
                "email": element.email
            }
            clients.push(client)
        });
        if (error) throw error;
        res.send(clients)
    })

};
const showClientsbyNumber = async (req, res) => {
    const number = req.params.number
    let client = ClientDTO
    let clients = []
    mysqlConnection.query('SELECT * FROM client where number like \"%' + number +'%\"', (error, result) => {
        result.forEach(element => {
            client = {
                "idClient": element.idClient,
                "number": element.number,
                "name": element.name,
                "phone": element.phone,
                "email": element.email
            }
            clients.push(client)
        });
        if (error) throw error;
        res.send(clients)
    })

};


const updateClient = async (req, res) => {
    try {
        const client = req.body
        console.log(req.body)

        mysqlConnection.query("UPDATE `client` SET idClient=" + client.idClient + "," + "number=" + "'" + client.number + "'" + "," + "name=" + "'" + client.name + "'" + "," + "phone=" + "'" + client.phone + "'" + "," + "email=" + "'" + client.email + "'" +  " WHERE `client`.`idClient` =" + client.idClient + ";", (error, result) => {
           
            if (error) throw error;
            res.send("UPDAted client " + client.idClient + " Successfully")

        })
    } catch (error) {

        console.log(error)
    }
};
const deleteClient = async (req, res) => {
    const id = req.params.id
    mysqlConnection.query('DELETE FROM `client` WHERE `client`.`idClient` =' + id, (error, result) => {
        if (error) throw error;
        res.send(result)
    })

};
const insertClient = async (req, res) => {
    try {
        const client = req.body
       

        mysqlConnection.query("INSERT INTO `client` (`idClient`, `number`, `name`, `phone`, `email`) VALUES (NULL," + "'" + client.number + "'" + "," + "'" + client.name + "'"  + "," + "'" + client.phone + "'" + ", " + "'" + client.email + "'" +  ")", (error, result) => {
            if (error) throw error;
            res.send("Inserted client " + client.idClient + " Successfully")
        })
    } catch (error) {
        console.log(error)

    }


};
export { showClientsbyID, showClients,showClientsbyNumber, updateClient, deleteClient, insertClient,showClientsbyName}
