const express = require('express')
const shortid = require('shortid')

const server = express();

server.use(express.json());


let users = [
    {
        id: shortid.generate(),
        name: 'Charlie Lu',
        bio: 'Just a usesr'
    },
];
//POST


server.post('/api/users', (req, res) => {
    try{
        const { name, bio } = req.body;
        const newUser = { id: shortid.generate(), name, bio }
    
        if (!name || !bio){
            return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
        
        users.push(newUser)
        res.status(201).json(users)
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }

})

//GET
server.get('/api/users', (req, res) => {
    try {
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get('/api/users/:id', (req, res) => {
    try {
        const id = req.params.id;
        const user = users.find(u => u.id == id)

        if (!user){
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.json(user)
        }
    } catch (err){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
    
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    try {
        const id = req.params.id
        const user = users.find(u => u.id == id)
    
        if(!user){
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            users = users.filter(u => u.id !== id)
        }
    
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }

})

//PUT
server.put('/api/users/:id', (req, res) => {
    try {
        const id = req.params.id

        user = users.find(u => u.id == id)
        newUser = req.body;
        newUser.id = id;

        if(!user){
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else if(!req.body.name || !req.body.bio){
            return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            users = users.map(user => {
                if(`${user.id}` == id){
                    return req.body 
                }
                return user;
            })
            res.status(200).send(users)
        }
    }catch (err){
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }

})

const port = 1000;
server.listen(port, () => console.log("server running..."))