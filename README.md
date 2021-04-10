# Api Rest, identificación con token.

Para realizar esta prueba primeramente he creado una clase policie y otra client son sus respectivos atributos. 

Como segundo paso accedemos al servidor mediante el modulo express en el puerto numero 3000.
Con el modulo JWT generamos un token que tendrá que ser necesario para acceder a cada endpoint o dará error. 

Para probar el ejercicio utilizamos POSTMAN, primeramente enviamos un post /login. Con las credenciales client_ID: dare y client_secret: s3cr3t obtendremos
el token. Este token tendremos que insertarlo en el header:( key: access-token, value: token).
Ahora ya podremos acceder a todos los End Point del ejercicio sin problemas.

El ejercicio pide seis endpoints sin embargo he conseguido ahorrar codigo utilizando cuatro sin obviar ninguna funcionalidad, mediante un concidional compruebo si el endpoint del get (tanto client como policies) contienen un id en la query, en caso negativo mostrará el listado completo de clients y policies, por otra parte si la query contiene 
un id mostrará sólo el elemento con ese id.

*CAPTURACION DE ERRORES*

El ejercicio contiene también una serie de capturaciones de errores:

* POST /login: Al intentar acceder con una clave o un password incorrecto.

* GET /"randomLink": En el caso de intentar acceder a una ruta que no existe.

* GET /clients: Al intentar acceder a un id que no existe, si la lista de clientes se encuentra vacía, si no has accedido con token y si el token no es válido.

* GET /policies: Al intentar acceder a un id que no existe, si la lista de politicas se encuentra vacía, si no has accedido con token y si el token no es válido.

* GET /policies/client: Al intentar acceder a un id que no existe, si no escribes ningún id, si no has accedido con token y si el token no es válido.

*TESTING*

Para la fase de testing he utilizado el framework Mocha y el modulo Supertest, en la carpeta test he creado el fichero api.test.js donde importo el modulo app de server.js (donde se llama a las distintas api rest). Hago el testing de los cuatro endpoint con resultado positivo. Para ejecutar el testing se inicializa con el comando npm test. En el fichero package.json agrego en el apartado scripts el test de mocha, introduzco la ruta con el sufijo --exit para que se acabe de ejecutar el servidor cuando finalice el testeo.
