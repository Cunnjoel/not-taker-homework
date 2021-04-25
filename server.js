const express = require('express');
const path = require('path')
const fs = require("fs");

const store = require('./Main/db/db.json')

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

fs.readFile("Main/db/db.json", "utf8", (err, data) => {

  if (err) throw err;

  const notes = JSON.parse(data);
  //API get request
  app.get('/api/notes', (req, res) => res.json(notes));

  //HTML get requests
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Main/public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Main/public/index.html'));
  });


  //API post request
  app.post('/api/notes', (req, res) => {

    let newNote = req.body
    notes.push(newNote);
    updateNote();
    return console.log("New note added: " + newNote.title);
  });

  //retrieve note
  app.get("/api/notes/:id", function (req, res) {
    res.json(notes[req.params.id]);
  })
});

function updateNote() {
  fs.writeFile("Main/db/db.json", JSON.stringify(notes, '/t'), err => {
    if (err) throw err;
    return true;
  });
}

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});