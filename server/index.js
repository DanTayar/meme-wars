const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');

const connection = new ORM('postgres://memewars:password@localhost:5432/memewars');

const modelsFactory = require('./models');
const {User , Meme , Vote} = modelsFactory (connection , ORM);

const api = require('./api')(app, {User, Meme, Vote});

connection.authenticate()
	.then(() => console.log('success'))
	.catch((err) => console.log(err));



app.use( express.static('build') );
app.use( express.json() );


app.get('/hydrate', (req, res)=> {
  // sync table
  	User.sync({ force: true })
  	.then(() => Meme.sync({ force: true }))
  	.then(() => Vote.sync({ force: true }))
  	.then(()=> res.json({ message: 'success creating User , Meme , Vote table' }))
  		.catch(err => res.status(500).json({message: JSON.stringify(err)}))
});

// connect to db

app.post('/User', (req, res)=> {
	User.create(req.body)
		.then(UserCreateResponse => console.log(UserCreateResponse))
		.then(() => res.json({message: 'user created' })) 
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: JSON.stringify(err) })
	});
});

app.get('/User/:id', (req, res)=> {
	User.findByPk(1*req.params.id)
		.then(user => res.json(user));

});

app.post('/meme', (req, res)=> {
	Meme.create(req.body)
		.then(() => res.json({message: 'meme created' })) 
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: JSON.stringify(err) })
	});
});

app.get('/meme/:id', (req, res)=> {
	Meme.findByPk(1*req.params.id)
		.then(user => res.json(user));

});

app.post('/vote', (req, res)=> {
	Vote.create(req.body)
		.then(() => res.json({message: 'vote created' })) 
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: JSON.stringify(err) })
	});
});

app.get('/vote/:id', (req, res)=> {
	Vote.findByPk(1*req.params.id)
		.then(user => res.json(user));

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));