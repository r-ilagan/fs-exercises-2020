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

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people.map((person) => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      console.log(person);
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) =>
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people<br />${new Date()}</p>`
    )
  );
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((newPerson) => {
      res.json(newPerson.toJSON());
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson.toJSON()))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
