const cors = require('cors')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Working')
})

//
// CREATE
//

app.post('/exercise', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    res.status(201).send('CREATE')
})

//
// READ
//

app.get('/exercises', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    res.status(200).send('READ')
})

//
// UPDATE
//

app.put('/exercise/:exercise_id', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    res.status(200).send('UPDATE')
})

//
// DELETE
//

app.delete('/exercise/:exercise_id', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    res.status(200).send('DELETE')
})

//
// START SERVER
//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
