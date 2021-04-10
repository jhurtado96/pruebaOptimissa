// Creo la clase Cliente con 4 atributos

class Client
{


    constructor (id,name,email,role)
    {
        this.id=id;
        this.name=name;
        this.email=email;
        this.role=role;
    }


    
}
 

 // Creo la clase Policie con 6 atributos

class Policie {

    constructor (id, amountInsured,email, inceptionDate, installmentPayment,clientId)
    {
        this.id = id;
        this.amountInsured = amountInsured;
        this.email = email;
        this.inceptionDate = inceptionDate;
        this.installmentPayment = installmentPayment
        this.clientId=clientId
        
    }

}

//Creo 4 objetos de la clase cliente y politica donde  Id será la posición del array en el que estará ubicado

let clientOne = new Client ("0","Pablo","pablo@gmail.com","Analista");
let clientTwo = new Client ("1","luis","luis@gmail.com","dev");
let clientThree = new Client ("2","jaime","jaime@gmail.com","manager");
let clientFour = new Client ("3","manuel","manuel@gmail.com","engineer");



let policieOne = new Policie ("0","3000","po@gmail.com","14/04/1006","3000",clientOne);
let policieTwo = new Policie ("1","3000","pt@gmail.com","17/02/1206","3000",clientTwo);
let policieThree = new Policie ("2","3000","pth@gmail.com","17/04/1406","3000",clientThree);
let policieFour = new Policie ("3","3000","pf@gmail.com","01/01/2006","3000",clientFour);


// Se crean dos arrays que nos servirán para almacenar los objetos de la clase Politica y Cliente, para así poder acceder a ellos en los end-point


let arrPolicies=[policieOne,policieTwo,policieThree,policieFour]


let arrClients = [clientOne,clientTwo,clientThree,clientFour]

//Utilizo modulo express para el api rest y el jwt para generar el token de autenticacion

const jwt = require("jsonwebtoken");
const express = require("express");

 
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


	  //contraseña de JWT que usa para encriptar la información
      // podría ir en otro fichero pero no es necesario en este caso
const config = {
	llave : "miclaveultrasecreta123*"
};


app.set('llave', config.llave);


//Inicio el servidor en el puerto 3001
app.listen(3001,()=>{
    console.log('Servidor iniciado en el puerto 3001') 
});
// Ahora vienen los end point. Prueba unitaria para ver si estoy conectado al servidor
app.get('/', function (req,res){
    res.send('Hello from server')
});

// En este end point realizamos el login en el cual hardcodeamos un user y un psw, con el modulo de jwt generamos un token y lo devolvemos al usuario 

app.post('/login', (req, res) => {
    if(req.body.client_ID === "dare" && req.body.client_secret === "s3cr3t") {
		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, app.get('llave'), {
			expiresIn: 1440
		});
		res.send({
            code:200,
			mensaje: 'Autenticación correcta',
			token: token,
            expiresIn:1440
		});
    } else {
        res.send({code:401, mensaje: "Unauthorized error"})
    }
})

//En este punto verificamos si el token recibido es válido o no dando feedback al usuario
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
	
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.send({code:401, mensaje: 'Unauthorized error' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ codigo:403, mensaje: 'Forbidden error'});
    }
 });

//End point de clients, llamamos tambien a rutas protegidas para saber si se ha recibido el token correctamente. En este endpoint podemos tanto poner id en la query como si no,
// si existe el id muestra solo el cliente con ese id, en caso de que no pongamos nada en la query mostrará todos.

app.get("/clients", rutasProtegidas,
function (req,res) 
{
    let respuesta;
    let id=req.query.id
    if (arrClients==null) {
        respuesta={error:false, codigo:201, mensaje:'No hay clientes'}
    }   
    
    if(id)        
    {
        if (arrClients.length<id) {
            respuesta={error:false, codigo:201, mensaje:'No hay clientes con ese id'}
            
        } else {
            respuesta = {error:false, codigo:200 ,mensaje:arrClients[id]};
        }
        
        
    }else{
        respuesta={error:false, codigo:200, mensaje:arrClients}
        
    }
    res.send(respuesta); 


    
} 
)

//End point de policies, llamamos tambien a rutas protegidas para saber si se ha recibido el token correctamente. En este endpoint podemos tanto poner id en la query como si no,
// si existe el id muestra solo la politica con ese id junto a su cliente, en caso de que no pongamos nada en la query mostrará todos junto a sus respectivos clientes.

app.get("/policies",
function (req,res) 
{
    let id = req.query.id
    let respuesta;
    if (arrPolicies==null) {
        respuesta={error:false, codigo:199, mensaje:'No hay politicas'}
    }
    
        
    
    if(id)        
    {
        if (arrPolicies.length<id) {
            respuesta={error:false, codigo:201, mensaje:'No hay politicas con ese id'}
        } else {
            
            
            respuesta = {error:false, codigo:200, mensaje:arrPolicies[id]};
        }
        
    }else{
        respuesta={error:false, codigo:200, mensaje:arrPolicies}
        
    }
    res.send(respuesta); 


    
} 
)

//End point de policies/client, llamamos tambien a rutas protegidas para saber si se ha recibido el token correctamente. En este endpoint tenemos poner id en la query,
// si no hay id como si no existe mostrará un msje de error ,si existe el id muestra solo el cliente de su respectiva politica.

app.get("/policies/client",
function (req,res) 
{
    let respuesta;
    
    
        
    let id = req.query.id
    if(id)        
    {
        if (arrPolicies.length<id) {
            respuesta={error:false, codigo:201, mensaje:'No hay politicas con ese id'}
        } else {
            
            
            respuesta = {error:false, codigo:200, mensaje:arrPolicies[id].clientId};
        }
        
    }else{
        respuesta={error:false, codigo:200, mensaje:"Id inexistente"}
        
    }
    res.send(respuesta); 


    
} 
)

//En el caso de llamar a un endpoint que no existe mostrará el msj de error 404

app.use(function(req, res, next){
    respuesta = {codigo: 404, mensaje: "URL no encontrado"}
    res.status(404).send(respuesta)
})