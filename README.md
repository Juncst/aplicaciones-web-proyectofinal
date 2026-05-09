# Proyecto Final App Web

Este proyecto implementa una comunicación en tiempo real desde PostgreSQL hacia Angular.

La idea principal es que el cambio no inicia desde el frontend, como normalmente sucede cuando Angular solicita información al backend. En este caso, el cambio inicia directamente desde la base de datos.

Cuando se ejecuta un `UPDATE` en PostgreSQL, se activa un `trigger`. Este trigger ejecuta una función que envía una notificación al backend usando `NOTIFY`. Luego, Node.js escucha ese evento con `LISTEN` y transmite la información al frontend mediante `Socket.io`.

De esta forma, Angular puede mostrar los cambios en tiempo real sin necesidad de estar consultando constantemente al servidor.

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- Socket.io
- CORS
- Nodemon

### Frontend

- Angular
- Angular Material
- Socket.io Client
- HttpClient

### Base de datos

- PostgreSQL
- Trigger
- Function
- NOTIFY
- LISTEN

---

## Estructura del proyecto

```text
proyecto-final-appweb/
├─ backend/
│  ├─ app.js
│  ├─ config/
│  │  └─ db.js
│  ├─ listeners/
│  │  └─ friendsListener.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  ├─ angular.json
│  └─ package.json
└─ database/
   └─ init.sql
```

---

## Funcionamiento general

El flujo principal del proyecto es el siguiente:

```text
PostgreSQL → Trigger → Function → NOTIFY → Node.js → LISTEN → Socket.io → Angular
```

Cuando se ejecuta un `UPDATE` sobre la tabla `my_friends`, PostgreSQL detecta el cambio por medio de un trigger.

Luego, el trigger ejecuta una función que prepara la información modificada y la envía mediante `NOTIFY` al canal `my_friends_channel`.

Node.js se mantiene escuchando ese canal usando `LISTEN`. Cuando recibe una notificación, toma la información enviada por PostgreSQL y la transmite al frontend usando `Socket.io`.

Finalmente, Angular recibe el evento en tiempo real y actualiza la interfaz sin necesidad de recargar la página.

---

## Base de datos

La base de datos utilizada en el proyecto es:

```text
bd_proyecto_final_appweb
```

La tabla principal utilizada es:

```text
my_friends
```

### Columnas de la tabla

| Columna | Descripción |
|---|---|
| `id` | Identificador del registro |
| `name` | Nombre del amigo |
| `gender` | Género |

---

## Consulta de prueba

Para probar el funcionamiento del trigger y la comunicación en tiempo real, se puede ejecutar el siguiente `UPDATE` en PostgreSQL:

```sql
UPDATE my_friends
SET name = 'Jose'
WHERE name = 'Rigoberto';
```

Al ejecutar esta consulta, PostgreSQL detecta el cambio, envía la notificación al backend y Angular muestra la actualización en tiempo real.

---

## Instalación del backend

Primero se debe entrar a la carpeta del backend:

```bash
cd backend
```

Luego se instalan las dependencias:

```bash
npm install
```

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

El backend se ejecuta en:

```text
http://localhost:3000
```

Ruta disponible para obtener los datos de la tabla:

```text
http://localhost:3000/friends
```

---

## Instalación del frontend

Primero se debe entrar a la carpeta del frontend:

```bash
cd frontend
```

Luego se instalan las dependencias:

```bash
npm install
```

Para ejecutar Angular:

```bash
ng serve -o
```

El frontend se ejecuta en:

```text
http://localhost:4200
```

---

## Prueba del proyecto

Para comprobar el funcionamiento general del proyecto, se deben seguir estos pasos:

1. Ejecutar el backend.
2. Ejecutar el frontend.
3. Abrir pgAdmin o PostgreSQL.
4. Ejecutar un `UPDATE` sobre la tabla `my_friends`.
5. Verificar que Angular muestre el cambio en tiempo real.

Consulta de prueba:

```sql
UPDATE my_friends
SET name = 'Jose'
WHERE name = 'Rigoberto';
```

Después de ejecutar el cambio, Angular debe mostrar la información recibida desde PostgreSQL, incluyendo:

- Nombre de la tabla modificada.
- Columna modificada.
- Valor anterior.
- Valor nuevo.
- Tabla actualizada con Angular Material.

---

## Librerías principales

### Backend

| Librería | Uso |
|---|---|
| `express` | Permite crear el servidor backend. |
| `cors` | Permite la comunicación entre Angular y Node.js. |
| `pg` | Permite conectar Node.js con PostgreSQL. |
| `socket.io` | Envía eventos en tiempo real desde el backend hacia Angular. |
| `nodemon` | Reinicia automáticamente el servidor durante el desarrollo. |

### Frontend

| Librería | Uso |
|---|---|
| `@angular/material` | Permite usar componentes visuales para la interfaz. |
| `socket.io-client` | Permite conectar Angular con Socket.io. |
| `HttpClient` | Permite consumir la ruta `/friends` del backend. |

---

## Explicación técnica del flujo

El proyecto usa una combinación de herramientas de base de datos, backend y frontend para lograr una actualización en tiempo real.

Primero, PostgreSQL detecta un cambio en la tabla `my_friends` mediante un trigger. Este trigger ejecuta una función que construye la información del cambio realizado, como la tabla afectada, el campo modificado, el valor anterior y el valor nuevo.

Después, PostgreSQL envía esa información al backend mediante `NOTIFY`. Node.js escucha ese canal usando `LISTEN`, por lo que no necesita estar consultando la base de datos a cada momento.

Cuando Node.js recibe la notificación, utiliza `Socket.io` para enviar el evento al frontend. Angular recibe ese evento y actualiza la vista para mostrar el cambio realizado.

Este flujo permite que la aplicación sea más dinámica, ya que los cambios realizados en la base de datos pueden reflejarse en la interfaz sin recargar la página.

---

## Objetivo del proyecto

El objetivo principal de este proyecto es demostrar cómo se puede implementar una comunicación en tiempo real entre una base de datos PostgreSQL y una aplicación Angular.

También se busca aplicar el uso de triggers, funciones, notificaciones de PostgreSQL, backend con Node.js y comunicación en tiempo real con Socket.io.

---

## Resultado esperado

Al ejecutar correctamente el proyecto, el usuario puede realizar un cambio directamente en PostgreSQL y visualizarlo en Angular de forma automática.

El sistema debe mostrar la información del cambio realizado y actualizar la tabla principal sin necesidad de recargar la página manualmente.

---

## Conclusión

Este proyecto demuestra una forma práctica de conectar PostgreSQL, Node.js y Angular para trabajar con eventos en tiempo real.

El uso de `LISTEN` y `NOTIFY` permite que PostgreSQL envíe avisos al backend cuando ocurre un cambio importante. Luego, Node.js toma esa información y la envía al frontend usando `Socket.io`.

Con esto se logra una aplicación más interactiva, donde Angular puede reaccionar automáticamente a los cambios realizados en la base de datos.