# Test imaginamos

# Setup con docker compose
1. Ejecutar
```
docker-compose up -d
```

2. Subir sql con los datos base a la base de datos `imaginamos_test`, credenciales: `user: postgres` y `password: postgres`

3. Reiniciar los containers para que el backend inicie normalmente
```
docker-compose restart
```

# Setup manual 
1. Instalar dependencias
```
npm i
```

2. Subir sql a la base de datos. se asume que los datos de acceso son iguales que con el setup en docker y adicional que corre en `localhost` la base d datos

3. Ejecutar backend
```
npm start
```   

# Rutas
backend: http://localhost:3000/api/   
documentacion: http://localhost:3000/api-docs/

En la documentacion con swagger esta la lista de enpoints disponibles en el proyecto