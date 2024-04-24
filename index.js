require('dotenv').config()

const Note = require('./models/note')



const express = require("express");
const app = express();
const cors = require("cors");
const password = process.argv[2];

app.use(cors());

app.use(express.json());

app.use(express.static("dist"));



/*
GET
*/
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

/*
Get by ID
*/
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})


/*
POST
*/
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})




/*

*/
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
