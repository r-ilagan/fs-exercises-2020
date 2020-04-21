const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :req[content-length] :response-time ms - :res[content-length] :body'
  )
);
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people.map((person) => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people<br />${new Date()}</p>`
  );
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((newPerson) => {
    res.json(newPerson.toJSON());
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
