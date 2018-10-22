'use strict'

const bodyparser = require('body-parser');
const express = require('express');
const mysql2 = require('mysql2');
const Sequelize = require('sequelize');

let app = express();

app.use(bodyparser.json())

const sequelize = new Sequelize({
  database: 'random',
  username: 'root',
  password: 'Whiteboy1',
  dialect: 'mysql'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Color = sequelize.define('colors', {
  ColorsTableId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  colorName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  hexCode: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  rgb: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(45),
    allowNull: false
  }
}, {
  timestamps: false
});

const Suggestion = sequelize.define('suggestions', {
  SuggestionsTableId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  colorName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  hexCode: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  rgb: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(45),
    allowNull: false
  }
}, {
  timestamps: false
});

app.get('/random', function(req, res) {
  Color.findAll()
    .then((results) => {
      let ranNum = Math.floor(Math.random() * results.length)
      res.send(results[ranNum])
    })
    .catch((err) => {
      res.send(err)
    })
})

app.get('/all', function(req, res) {
  Color.findAll()
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.listen(3000, () => {
  console.log('Server started on Port 3000');
})

app.post('/suggestion', function(req, res) {
  Suggestion.create(req.body)
    .then((suggestion) => {
      suggestion.save();
    })
    .then(() => {
      res.send('it worked')
    })
    .catch((err) => {
      console.log(err);
      res.send(err)
    })
})

app.get('/admin', function(req, res) {
  Suggestion.findAll()
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post('/newColor', function(req, res) {
  Color.create(req.body)
    .then((color) => {
      color.save();
    })
    .then(() => {
      res.send('it worked')
    })
    .catch((err) => {
      console.log(err);
      res.send(err)
    })
  Suggestion.destroy({
    where: {
      SuggestionsTableId: req.body.SuggestionsTableId
    }
  })
    .then(() => {
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.send('oops, did not work')
    })
})

app.delete('/removeSuggestion/:id', function(req, res) {
  Suggestion.destroy({
    where: {
      SuggestionsTableId: req.params.id
    }
  })
    .then(() => {
      console.log(req.body);
      res.send('it worked')
    })
    .catch((err) => {
      console.log(err);
      res.send('oops, did not work')
    })
});
