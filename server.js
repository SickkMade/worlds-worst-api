const express = require('express')
const app = express() //app is short for express!
const PORT = 8000;

const pokemon = {
    'pikachu': {
        'type': 'electric',
        'generation': 1
    },
    'mew': {
        'type': 'psychic',
        'generation': 1
    },
    'furret': {
        'type': 'normal',
        'generation': 2
    },
    'default': {
        'type': 'unknown',
        'generation': -1
    },
}

//NO SERVER SETUP NEEDED!
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
} )

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js')
})

app.get('/api/:name', (req, res) => { //path name NOT query parameter
    let name = req.params.name.toLowerCase();
    let result = pokemon[name] || pokemon['default']
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})