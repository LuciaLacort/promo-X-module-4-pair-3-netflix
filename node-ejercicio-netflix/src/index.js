const express = require('express');
const cors = require('cors');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

const mysql = require('mysql2/promise');

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
    console.log('Pidiendo a la base de datos información de los empleados.');
    let sql = 'SELECT * FROM movies';
  
    const connection = await getConnection();
    const [results, fields] = await connection.query(sql);
    res.json({success:true, movies:results});
    connection.end();
  });
  
  // if(fakeMovies.length === 0){
  //   res.status(500).json({result:"no hay peliculas", success:false});
  // } else {
  //   res.status(200).json({result: fakeMovies, success:true});
  // }

console.log('Server running');

const staticServerPathWeb = './src/public-react/'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerPathImg = './src/public-movies-images/'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImg));



