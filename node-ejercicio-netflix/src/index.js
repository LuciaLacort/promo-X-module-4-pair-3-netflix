const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_netflix_pair',
    user: 'freedb_pair3',
    password: 'x@QjX4Pkc&FY$sh',
  });
  await connection.connect();
  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );
  return connection;
}

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// const fakeMovies = [
//   {
//     id: 1,
//     title: "Wonder Woman",
//     genre: "Action",
//     image:
//       "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
//     category: "Superhero",
//     year: 2017,
//     director: "Patty Jenkins",
//   },
//   {
//     id: 2,
//     title: "Inception",
//     genre: "Science Fiction",
//     image:
//       "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
//     category: "Thriller",
//     year: 2010,
//     director: "Christopher Nolan",
//   },
// ];


server.get('/movies', async (req, res) => {
  const connection = await getConnection();
    console.log('Pidiendo a la base de datos información de los empleados.');
    console.log(req.query);
    const queryGenre = req.query.genre;
    // console.log(queryGenre);
    let data;
    if (!queryGenre) {
      const sql = 'SELECT * FROM movies';
      const [results] = await connection.query(sql);
      data = results;
    } else {
      const sql = 'SELECT * FROM movies WHERE genre = ?;';
      const [results] = await connection.query(sql, [queryGenre]);
      data = results;
    }
    res.json({success:true, movies:data});
    connection.end();
  });

  server.get('/movie/:idMovies', async (req, res) => {
    const {idMovies} = req.params; 
    const conn = await  getConnection();
    const select = 'SELECT * FROM movies WHERE idMovies = ?';
    const [results] = await conn.query(select, [idMovies]);
    const foundMovie = results[0];
    console.log(results);
    res.render('movie', foundMovie);
   });

   server.post('/sign-up', async (req,res) => {
    console.log(req.body);
    const conn = await  getConnection()
    const {email, password} = req.body;
    const selectUser = 'SELECT * FROM Users WHERE email = ?';
    const [resultUser] = await conn.query(selectUser, [email]); 
    if(resultUser.length !== 0 ){
      //No tenemos que comparar y cambiar el bcrypt con función hash
      const isSamePassword = await bcrypt.hash(password, 10);

      //desde aquí es de login 
      if(isSamePassword){
        const infoToken = {email: resultUser[0].email, id: resultUser[0].idUser}
        const token = jwt.sign(infoToken, "secret_key", {expiresIn: "1h"});
        res.status(201).json({succes:true, token: token})
      } else {
        res.status(400).json({succes:false, message: "contraseña incorrecta"})
      }
    }
   });

   //Crear otro post para login

console.log('Server running');

const staticServerPathWeb = './src/public-react/'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerPathImg = './src/public-movies-images/'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImg));



