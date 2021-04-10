# Api Rest, identificación con token.

Para realizar esta prueba primeramente he creado una clase policie y otra client son sus respectivos atributos. 
Como segundo paso accedemos al servidor mediante el modulo express.
Con el modulo JWT generamos un token que tendrá que ser necesario para acceder a cada endpoint o dará error. 
Para probar el ejercicio utilizamos POSTMAN, primeramente enviamos un post /login. Con las credenciales usuario: dare y password:s3cr3t obtendremos
el token. Este token tendremos que insertarlo en el header key: access-token value: token.
Ahora ya podremos acceder a todos los End Point del ejercicio sin problemas.
