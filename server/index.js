const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');

const connection = new ORM('postgres://memewars:password@localhost:5432/memewars');

const modelsFactory = require('./models');
const {User , Meme , Vote} = modelsFactory (connection , ORM);

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


app.post('/meme', (req, res)=> {
  // save to db
  res.status(500).send('no db connection yet');
});

app.get('/meme', (req, res)=>{
  res.json([]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));