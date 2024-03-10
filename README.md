# README - APLICACIÓN DE MARVEL

- La aplicación se ha creado utilizando la plantilla generada por el comando `npx create-react-app marvel-characters-app --template typescript` y modificándola posteriormente.
- La versión de **producción** se encuentra en la carpeta **build**
- La aplicación se ha desarrollado usando React, TypeScript, Jest y SCSS.

## NOTA IMPORTANTE

- Hay que reemplazar el nombre del fichero `env.sample` a `.env` para probar la versión de desarrollo

- Hay introducida una "key" y "private key" de la API de Marvel en el código

    Si se quisiera probar con otras keys, o estas hubieran excedido el límite de fetch diarios por alguna razón, habría que realizar lo siguiente:

  1. Abrir el fichero `.env`
  2. Reemplazar el valor de `REACT_APP_API_KEY` por la "public key" deseada.
  3. Reemplazar el valor de `REACT_APP_API_PRIVATE_KEY` por la "private key" deseada.
  4. Generar la nueva "build" de producción, si se desea utilizar esta en lugar de la de desarrollo, con el comando `npm run build` dentro de la carpeta de la aplicación.

## ARQUITECTURA Y ESTRUCTURA

La aplicación se desglosa en las siguientes carpetas:
-  **build**: Dónde se encuentra la versión de producción, minificada y concatenada
-  **public**: Dónde está el index.html, el favicon, el manifest.json, y el robots.txt
   -  Aquí se modificó el favicon y el "title" de la aplicación nada más

-  **.env**: Las variables de entorno
   -  Aquí es donde están definidos los **paths**, la **API** y las **keys**.

-  **src**: El contenido de la aplicación. Está dividido en tres carpetas principales: **app**, **integration** y **pages**:
   -  **app**: Aquí nos encontraremos otras subcarpetas con diferentes elementos de la aplicación:
      -  **assets**: Los assets utilizados, separados en este caso por la tipografía utilizada y los logos e imágenes
      -  **components**: Los componentes creados y utilizados para esta aplicación, separados por carpetas. Cada carpeta puede contener los siguientes ficheros:
         -  *Componente.tsx*: El desarrollo del componente
         -  *Componente.interface.ts*: Las interfaces y tipos del componente, en caso necesario
         -  *Componente.module.scss*: El estilo del componente, en caso necesario
         -  *Componente.spec.tsx*: Los test del componente
         -  *index.ts*: Estos ficheros se han utilizado para una correcta indexación de los elementos y evitar imports con paths muy largos y poco legibles
  
      -  **context**: Aquí se encuentra el ContextAPI para gestionar estados de la aplicación
      -  **data/mock**: Aquí hay un par de JSON mock utilizados para los tests
      -  **hooks**: Hooks desarrollados y utilizados en diferentes componentes
      -  **layout**: En este caso siempre utilizamos un solo layout, con la barra superior en todas las páginas, pero aquí se añadirían más layouts en caso necesario
      -  **routes**: Gestión de los diferentes paths
  
   -  **integration**: Carpeta donde se desarrollarían los endpoints para conectar con el backend. En este caso aquí hay las funciones fetch que llaman a la API de Marvel.
  
   -  **pages**: Las diferentes páginas que tiene la aplicación, en este caso tenemos 3:
      -  **Landing**: La vista principal, con el listado de personajes
      -  **CharacterInfo**: La vista de la información del personaje
      -  **NotFound**: Cualquier otro path que no sea uno de los dos anteriores nos llevará ha esta página de "No encontrado"
  
   -  **index.tsx**: Este es el único index que no actúa como indexador, ya que aquí es dónde se encuentra la App.
   -  **indexx.scss**: Variables generales para todo el proyecto. Hay algunas normalizaciones de algunos componentes utilizados, las variables para los colores y la tipografia.
   -  **env.ts** y **config.ts**: Para el uso en la aplicación de las variables de entorno de .env

-  Otros ficheros/carpetas de configuración
  

## CÓMO EJECUTAR LA APLICACIÓN

### MODO DE PRODUCCIÓN

La versión de producción se encuentra en la carpeta build. Teniendo en cuenta esto, y que nos encontramos en la carpeta de la aplicación, se puede ejecutar en local simplemente con el siguiente comando:

`npx serve -s build`

Si queremos ejecutar la aplicación en local desde otro puerto (por defecto es el puerto 3000):

`npx serve -s build -p <numero_de_puerto>`

Si ya estamos dentro de la carpeta de producción a ejecutar simplemente omitimos el nombre de esta:

`npx serve -s`

Una vez lanzando el comando podremos ver la aplicación en nuestro navegador en una de las siguientes rutas:

-  http://localhost:3000
-  http://localhost:<numero_de_puerto>
-  http://192.168.1.128:3000
-  http://192.168.1.128:<numero_de_puerto>

### MODO DE DESARROLLO

Si queremos ejecutar la versión de desarrollo, teniendo en cuentra que nos encontramos dentro de la partea de la aplicación. Tenemos dos opciones, usando yarn o npm.

Pero primero de todo:

- **Reemplazar el nombre del fichero `env.sample` a `.env`**

###### YARN

1. Ejecuta `yarn install`
2. Ejecuta `yarn start`
3. Accede a `http://localhost:3000` en tu navegador

###### NPM

1. Ejecuta `npm install`
2. Ejecuta `npm start`
3. Accede a `http://localhost:3000` en tu navegador

