import logo from './logo.svg';
import './App.css';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState , useRef } from "react";
import axios from "axios";
import toast from "toasted-notes";
import toaster from "toasted-notes";
import { Toast } from 'primereact/toast';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { createBrowserHistory } from "history";
import 'toasted-notes/src/styles.css';


const ApiUrl = "http://localhost:3001/"
const hist = createBrowserHistory();

function App() {

//#region  ---------- STATE ----------
  const [globalFilter, setGlobalFilter] = useState('');
  const [pasword, setpasword] = useState();
  const [username, setusername] = useState();
  const [mail, setmail] = useState();
  const [users, setusers] = useState([]);
  const [clients, setclients] = useState([]);
  const [log, setlog] = useState(false);
  const [sing, setsing] = useState(false);
  const [phoneC, setphoneC] = useState();
  const [mailC, setmailC] = useState();
  const [nameC, setnameC] = useState();
  const [numberC, setnumberC] = useState();
  const [idC, setidC] = useState();
  const [busqueda, setbusqueda] = useState();
  const toast = useRef(null);
  const [clientsFilter, setclientsFilter] = useState([]);
  //#endregion

//CARGA LOS STATES CUANDO SE CARGA POR PRIMERA VEZ EL VIRTUAL DOM

  useEffect(() => {

    getallUsers();
    getallClients();

  }, [])

    //Ocultamos o mostramos ClientsF

    function ocultarMostrarclientFilter() {

      var x = document.getElementById("clientsFilter");

      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }

    }

  //Ocultamos o mostramos la tabla de clientes

  function ocultarMostrarclient() {

    var x = document.getElementById("clients");

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  //Ocultamos o mostramos la card de loging

  function ocultarMostrarLog() {

    var x = document.getElementById("LogCard");

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  //Ocultamos o mostramos la card de singing

  function ocultarMostrarSing() {

    var x = document.getElementById("SingCard");

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

    //Ocultamos o mostramos la card de AddClient

    function ocultarMostrarAddClient() {

      var x = document.getElementById("AddClient");

      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
      
    }

   //Ocultamos o mostramos la card de AddClient

    function ocultarMostrarEditClient() {
          var x = document.getElementById("EditClient");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }

    }

  //llamamos a las dos funciones de visualizacion de componentes

  function goSing() {

    ocultarMostrarLog()
    ocultarMostrarSing()
    getallUsers()
    
  }

  //llamamos a las funcion que oculta el card inicial y llamamos a getallClients() 
  
  function goLog() {

    ocultarMostrarLog()
    ocultarMostrarclient()

  }

//llamamos a mostrar ocultar add client y a mostrar ocultar client table

  function goAddClient() {

    ocultarMostrarAddClient()
    ocultarMostrarclient()

  }

  //llamamos a mostrar ocultar add client y a mostrar ocultar client table

  function goFilt() {

    getallClientsFilter()
    ocultarMostrarclientFilter()
    ocultarMostrarclient()

  }

  //llamamos a mostrar ocultar edit client y a mostrar ocultar client table

  function goEditClient(id) {

    setidC(id.idClient)
    setmailC(id.email)
    setnameC(id.name)
    setnumberC(id.number)
    setphoneC(id.phone)

    ocultarMostrarEditClient()
    ocultarMostrarclient()

  }

  //Buttons para la data table 

  const actionBodyTemplate = (rowData) => {
    
    return (

      <React.Fragment>
        <Button label="Edit" icon="pi pi-pencil" onClick={() =>goEditClient(rowData)} className="p-button-rounded p-button-success p-mr-2" />
        <Button label="Delete" icon="pi pi-trash" onClick={() =>deleteClient(rowData)} className="p-button-rounded p-button-warning" />
      </React.Fragment>

    );

  }

  //DELETE de cliente

  const deleteClient=(client)=>{

    axios.delete(ApiUrl + "client/deleteClient/"+client.idClient)
    window.alert("Cliente Eliminado");

  }



  //POST de usuario

  const PostUser = () => {

    let post = {

      name: username,
      mail: mail,
      pw: pasword

    };

    axios.post(ApiUrl + "users/insertUser", post).then((result) => {

      console.log(result)
      window.alert("Usuario Insertado");

    }).catch(e => {

      console.log(e);

    });
  }

//POST de Client

const Postclient= () => {

  let post = {

    number: numberC,
    name: nameC,
    phone: phoneC,
    email: mailC,
    
  };

  axios.post(ApiUrl + "client/insertClient", post).then((result) => {

    console.log(result)
    window.alert("Cliente Insertado");

  }).catch(e => {

    console.log(e);

  });

}

//PUT de Client

const Putclient= () => {

  let post = {

    idClient: idC,
    number: numberC,
    name: nameC,
    phone: phoneC,
    email: mailC,
    
  };
  
  axios.put(ApiUrl + "client/updateClient", post).then((result) => {
    
    console.log(result)
    window.alert("Cliente Actualizado");

  }).catch(e => {

    console.log(e);

  });
}
  
  //Cogemos todos los valores de usuarios almazenados en la bdd y los guardamos en un array local

  const getallUsers = () => {

    axios.get(ApiUrl + "users/getUsers", { headers: { 'Access-Control-Allow-Origin': '*' } }).then((respuesta) => {

      respuesta.data.forEach((item) => {

        users.push(item)

      })
     
    }).catch(e => {

      console.log(e);

    });

  }

  //Cogemos todos los valores de clientes almazenados en la bdd y los guardamos en un array local

  const getallClients = () => {

    axios.get(ApiUrl + "client/getClient", { headers: { 'Access-Control-Allow-Origin': '*' } }).then((respuesta) => {

      respuesta.data.forEach((item) => {

        clients.push(item)


      })
  
    }).catch(e => {

      console.log(e);

    });

  }
  
  //Cogemos todos los valores de clientes almazenados en la bdd y los guardamos en un array local

  const getallClientsFilter = () => {

    axios.get(ApiUrl + "client/getClientID/"+busqueda, { headers: { 'Access-Control-Allow-Origin': '*' } }).then((respuesta) => {

      respuesta.data.forEach((item) => {

        clientsFilter.push(item)

      })
      console.log(respuesta.data)
      console.log(clientsFilter)

    }).catch(e => {

      console.log(e);

    });

  }

  //En esta funcion comprobamos que la contraseña que la id y contraseña que el usuario nos pasa son correctas recorriendo el array que previemente gusrdamos con la funcion getallUsers()

  const checker = () => {

    (users).forEach((item) => {
    
      if (item.name == username) {

        console.log('user exist')
          if (item.pw == pasword) {

          setlog(true)
          goLog();
       
          } else {

            window.alert("Password Incorrect");


        }
      } else {

        window.alert("user doesnt exist");

      }
    })
    console.log(log)

  }

  const reset = () => {

    setGlobalFilter('');

}


  return (

    <div className="App" >

      <Card id="LogCard" title="Login" style={{ width: '25rem', marginBottom: '2em' }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "15px" }}>
          <label >Id:</label>
          <InputText style={{ margin: "15px" }} id="username" value={username} onChange={(e) => setusername(e.target.value)} />


          <label>Pasword:</label>
          <InputText id="username" style={{ margin: "15px" }} value={pasword} onChange={(e) => setpasword(e.target.value)} />


          <Button label="Login" onClick={checker} style={{ margin: "15px" }}></Button>
          <Button label="Singin" onClick={goSing} style={{ margin: "15px" }}></Button>
        </div>
      </Card>

      <Card id="SingCard" title="Singin" style={{ display: "none", width: '25rem', marginBottom: '2em' }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "15px" }}>

          <label >Name:</label>
          <InputText style={{ margin: "15px" }} id="username" value={username} onChange={(e) => setusername(e.target.value)} />

          <label>Email:</label>
          <InputText id="username" style={{ margin: "15px" }} value={mail} onChange={(e) => setmail(e.target.value)} />

          <label>Pasword:</label>
          <InputText id="username" style={{ margin: "15px" }} value={pasword} onChange={(e) => setpasword(e.target.value)} />


          <Button label="Back" onClick={goSing} style={{ margin: "15px" }}></Button>
          <Button label="Create account" onClick={PostUser} style={{ margin: "15px" }}></Button>
        </div>
      </Card>

      <div id="clients" style={{ display: "none" }}>
      <InputText style={{ margin: "15px" }} id="nameC" value={busqueda} onChange={(e) => setbusqueda(e.target.value)} />
      <Button label="Filtrar Por ID" onClick={goFilt} style={{ margin: "15px" }}></Button>
        <div className="card">
          <DataTable value={clients}>
            <Column field="idClient" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="number" header="Number"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
          <Button label="Add New Client" onClick={goAddClient}  style={{ margin: "15px" }}></Button>
        </div>
      </div>

      <Card id="AddClient" title="Singin" style={{ display: "none", width: '25rem', marginBottom: '2em' }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "15px" }}>
        <label >Name:</label>
          <InputText style={{ margin: "15px" }} id="nameC" value={nameC} onChange={(e) => setnameC(e.target.value)} />

          <label >Number:</label>
          <InputText style={{ margin: "15px" }} id="numberC" value={numberC} onChange={(e) => setnumberC(e.target.value)} />


          <label>Email:</label>
          <InputText id="mailC" style={{ margin: "15px" }} value={mailC} onChange={(e) => setmailC(e.target.value)} />

          <label>Phone:</label>
          <InputText id="phoneC" style={{ margin: "15px" }} value={phoneC} onChange={(e) => setphoneC(e.target.value)} />
          <Button label="Add New Client"  onClick={Postclient} style={{ margin: "15px" }}></Button>
          <Button label="Back" onClick={goAddClient} style={{ margin: "15px" }}></Button>
        </div>
      </Card>

      <Card id="EditClient" title="Singin" style={{ display: "none", width: '25rem', marginBottom: '2em' }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "15px" }}>
        <label >Name:</label>
          <InputText style={{ margin: "15px" }} id="nameC" value={nameC} onChange={(e) => setnameC(e.target.value)} />

          <label >Number:</label>
          <InputText style={{ margin: "15px" }} id="numberC" value={numberC} onChange={(e) => setnumberC(e.target.value)} />


          <label>Email:</label>
          <InputText id="mailC" style={{ margin: "15px" }} value={mailC} onChange={(e) => setmailC(e.target.value)} />

          <label>Phone:</label>
          <InputText id="phoneC" style={{ margin: "15px" }} value={phoneC} onChange={(e) => setphoneC(e.target.value)} />
          <Button label="Edit client"  onClick={Putclient} style={{ margin: "15px" }}></Button>
          <Button label="Back" onClick={goEditClient} style={{ margin: "15px" }}></Button> 
        </div>
      </Card>

      <div id="clientsFilter" style={{ display: "none" }}>

        <div className="card">
          <DataTable value={clientsFilter}>
            <Column field="idClient" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="number" header="Number"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
          <Button label="Back" onClick={goFilt}  style={{ margin: "15px" }}></Button>
        </div>
      </div>

    </div>
  );

}

export default App;
