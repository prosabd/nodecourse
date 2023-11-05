const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http');

const myLogger = function(req, res, next) {
  console.log("Request IP: " + req.ip);
  console.log("Request Method: " + req.method);
  console.log("Request date: " + new Date());

  next(); // THIS IS IMPORTANT!
}

app.use(myLogger);

app.get(['/about', '/contact-me', '/'], (req, res) => {
  let filePath;
  if (req.url === '/about') {
    filePath = path.join(__dirname, 'about.html');
  } else if (req.url === '/contact-me') {
    filePath = path.join(__dirname, 'contact-me.html');
  } else if (req.url == '/') {
    filePath = path.join(__dirname, 'index.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.status(500).send('Erreur du serveur');
    } else {
      // res.send(content);
    }
  });
});

app.use((req, res) => {
  fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
    if (err) {
      res.status(500).send('Erreur du serveur');
    } else {
      res.status(404).send(content);
    }
  });
});

app.listen(8080, () => {
  console.log('Serveur en écoute sur le port 8080');
});

// const server = http.createServer((req, res) => {
//     const { url } = req;
//     let filePath;

//     if (url === '/about') {
//         filePath = path.join(__dirname, 'about.html');
//     } else if (url === '/contact-me') {
//         filePath = path.join(__dirname, 'contact-me.html');
//     } else if (url == '/') {
//         filePath = path.join(__dirname, 'index.html');
//     }else{
//         filePath = path.join(__dirname, '404.html');
//     }
    
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//         res.writeHead(500);
//         res.end('Erreur du serveur');
//         } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(content);
//         }
//     });
// });

// server.listen(8080, () => {
//   console.log('Serveur en écoute sur le port 8080');
// });




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.uhtjrzi.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);  

*/