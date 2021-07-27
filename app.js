const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const pg = require('pg')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())

app.get('/', (req, res) => {
    res.send('Working')
})

//
// DATABASE SETUP
//

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'web_simplex_db',
    password: '1234',
    port: 5432,
})

//
// CREATE
//

app.post('/exercise', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const sqlParams = [
        req.body.title,
        req.body.difficulty,
        req.body.task,
        parseInt(req.body.numberOfVars),
        parseInt(req.body.numberOfConstraints),
        JSON.stringify(JSON.parse(req.body.targetVars)),
        JSON.stringify(JSON.parse(req.body.constraintVars)),
        JSON.stringify(JSON.parse(req.body.constraintVals))
    ]

    const createSql = `
        INSERT INTO exercises (title,
                               difficulty,
                               task,
                               number_of_vars,
                               number_of_constraints,
                               target_vars,
                               constraint_vars,
                               constraint_vals)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *

    `

    pool.query(createSql, sqlParams, (error, result) => {
        if (error) {
            throw error
        }

        res.status(201).json(result.rows[0])
    })
})

//
// READ
//

app.get('/exercises', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const readSql = `
        SELECT title,
               difficulty,
               task,
               number_of_vars,
               number_of_constraints,
               target_vars,
               constraint_vars,
               constraint_vals
        FROM exercises
    `

    pool.query(readSql, (error, result) => {
        if (error) {
            throw error
        }

        res.status(200).json(result.rows)
    })
})

//
// UPDATE
//

app.put('/exercise/:exercise_id', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const exercise_id = parseInt(req.params.exercise_id)

    const sqlParams = [
        exercise_id,
        req.body.title,
        req.body.difficulty,
        req.body.task,
        parseInt(req.body.numberOfVars),
        parseInt(req.body.numberOfConstraints),
        JSON.stringify(JSON.parse(req.body.targetVars)),
        JSON.stringify(JSON.parse(req.body.constraintVars)),
        JSON.stringify(JSON.parse(req.body.constraintVals))
    ]

    const updateSql = `
        UPDATE exercises
        SET title                 = $2,
            difficulty            = $3,
            task                  = $4,
            number_of_vars        = $5,
            number_of_constraints = $6,
            target_vars           = $7,
            constraint_vars       = $8,
            constraint_vals       = $9
        WHERE id = $1 RETURNING *
    `

    pool.query(updateSql, sqlParams, (error, result) => {
        if (error) {
            throw error
        }

        res.status(200).json(result.rows[0])
    })

})

//
// DELETE
//

app.delete('/exercise/:exercise_id', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const exercise_id = parseInt(req.params.exercise_id)

    const sqlParams = [
        exercise_id
    ]

    const deleteSql = `
        DELETE
        FROM exercises
        WHERE id = $1 RETURNING *
    `

    pool.query(deleteSql, sqlParams, (error, result) => {
        if (error) {
            throw error
        }

        res.status(200).json(result.rows[0])
    })

})

//
// START SERVER
//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
