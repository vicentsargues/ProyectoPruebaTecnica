import mysqlConnection from "../connection.js";
import User from "../models/user.js";

const showUsers = async (req, res) => {
    
    mysqlConnection.query('SELECT * FROM user', (error, result) => {
        if (error) throw error;
        res.send(result)
        console.log(result)
    })

};

const insertUser = async (req, res) => {
    try {
        const user = req.body
       

        mysqlConnection.query("INSERT INTO `user` (`userId`, `name`, `mail`, `pw`) VALUES (NULL, '"+user.name+"', '"+user.mail+"', '"+user.pw+"')" , (error, result) => {
            if (error) throw error;
            res.send("Inserted user " + user.userId + " Successfully")
        })
    } catch (error) {
        console.log(error)

    }


};

export {showUsers,insertUser}