module.exports = (app{ User, Meme, Vote}) =>{
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
}