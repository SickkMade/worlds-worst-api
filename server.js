const express = require('express')
const app = express() //app is short for express!
const PORT = 8000;
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'cluster0'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName) //connect to db
    })
    
app.set('view engine', 'ejs') //use ejs
app.use(express.static('public')) //use a folder called public to auto give. IE if in that folder and requested then website will get 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const todoItems = await db.collection(dbName).find().toArray()
    const itemsLeft = await db.collection(dbName).countDocuments({completed: false})
    res.render('index.ejs', {items : todoItems, left: itemsLeft})
})

app.post('/addTodo', (req, res) => {
    db.collection(dbName).insertOne({thing: req.body.todoItem, completed:false}) //refers to the name of the input
    .then(() => {
        res.redirect('/') //refresh
    })
})

app.delete('/deleteItem', (req, res) => {
    db.collection(dbName).deleteOne({thing: req.body.itemFromJS}) //dont need '' it will parse it automatticaly ig LOL
    .then( () => {
        res.json('Item Deleted!') //will send back the resolt as a json file!
    })
    .catch(err => console.error(err))
})

app.put('/changeCompletion', async (req, res) => {
    const completionStatus = await db.collection(dbName).findOne({thing: req.body.itemFromJS})
    await db.collection(dbName).updateOne({thing: req.body.itemFromJS}, {
        $set: {
            completed: !completionStatus.completed
        }
    }, {
        sort:{_id: -1}, //if multiple of the same item, sort this one at the top
        upsert: false //change dont create a new copy with the change
    }) //dont need '' it will parse it automatticaly ig LOL

    res.json('Item Deleted!')
})
app.listen(PORT)









// const pokemon = {
//     'pikachu': {
//         'type': 'electric',
//         'generation': 1
//     },
//     'mew': {
//         'type': 'psychic',
//         'generation': 1
//     },
//     'furret': {
//         'type': 'normal',
//         'generation': 2
//     },
//     'default': {
//         'type': 'unknown',
//         'generation': -1
//     },
// }

// //NO SERVER SETUP NEEDED!
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// } )

// app.get('/main.js', (req, res) => {
//     res.sendFile(__dirname + '/main.js')
// })

// app.get('/api/:name', (req, res) => { //path name NOT query parameter
//     let name = req.params.name.toLowerCase();
//     let result = pokemon[name] || pokemon['default']
//     res.json(result)
// })

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`The server is running on port ${PORT}! You better go catch it!`)
// })