DESPLIEGUE PRODUCT MANAGER

Generar contenedores docker. Ubicarse en "Software/Docker" y ejecutar en consola:
docker-compose build
docker-compose up -d

No se requiere de la ejecución de ningún script de base de datos.

Backend: http://127.0.0.1:1011/
Frontend: http://127.0.0.1:1012/


FUNCIONAMIENTO PRODUCT MANAGER

El usuario puede crear usuarios. Se mantiene viva la sesión del usuario si este mantiene activo, gracias a la rotación de refresh (El refresh y acceso se renuevan continuamente). En caso de caducar el refresh actual, el usuario debe volver a hacer log in para continuar usando la aplicación. Se usa un whitelist de los refresh válidos por usuario, debido a que los refresh ya usados o caducados no pueden ser usados.

Una vez en la aplicación el usuario puede crear, eliminar, editar y ver productos.
