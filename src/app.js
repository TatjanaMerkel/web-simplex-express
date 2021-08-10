const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const math = require('mathjs')
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
    res.send('Hello Taejbi Baby')
})

//
// Create database connection
//

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'web_simplex_db',
    password: 'LD_j2bBF9Y',
    port: 5432,
})

//
// Init and seed database
//

async function initDatabase() {
    const createTypeSql = `
        DO $$ BEGIN
            CREATE TYPE difficulty AS ENUM ('EASY', 'MEDIUM', 'HARD');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$
    `

    await pool.query(createTypeSql)

    const createTableSql = `
        CREATE TABLE IF NOT EXISTS exercises
        (
            id
            SERIAL,

            title
            VARCHAR,

            difficulty
            difficulty,

            task
            VARCHAR,

            number_of_vars
            INT,
            number_of_constraints
            INT,

            target_vars
            VARCHAR, -- Fraction[] as JSON
            constraint_vars
            VARCHAR, -- Fraction[][] as JSON
            constraint_vals
            VARCHAR  -- Fraction[] as JSON
        )
    `

    await pool.query(createTableSql)
}

initDatabase().catch(error => console.error(error))

//
// GET /exercises
//

app.get('/exercises', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const selectSql = `
        SELECT id,
               title,
               difficulty,
               task,
               number_of_vars,
               number_of_constraints,
               target_vars,
               constraint_vars,
               constraint_vals
        FROM exercises
    `

    pool.query(selectSql, (error, result) => {
        if (error) {
            throw error
        }

        res.status(200).json(result.rows)
    })
})

//
// GET /exercise/:exercise_id
//

app.get('/exercise/:exercise_id', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const exercise_id = parseInt(req.params.exercise_id)

    const sqlParams = [
        exercise_id
    ]

    const selectSql = `
        SELECT id,
               title,
               difficulty,
               task,
               number_of_vars,
               number_of_constraints,
               target_vars,
               constraint_vars,
               constraint_vals
        FROM exercises
        WHERE id = $1
    `

    pool.query(selectSql, sqlParams, (error, result) => {
        if (error) {
            throw error
        }

        const row = result.rows[0]

        const exercise = {
            id: row.id,
            title: row.title,
            difficulty: row.difficulty,
            task: row.task,
            numberOfVars: row.number_of_vars,
            numberOfConstraints: row.number_of_constraints,
            targetVars: JSON.parse(row.target_vars, math.reviver),
            constraintVars: JSON.parse(row.constraint_vars, math.reviver),
            constraintVals: JSON.parse(row.constraint_vals, math.reviver)
        }

        res.status(200).json(exercise)
    })
})

//
// POST /exercise
//

app.post('/exercise', (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const sqlParams = [
        req.body.title,
        req.body.difficulty,
        req.body.task,
        parseInt(req.body.numberOfVars),
        parseInt(req.body.numberOfConstraints),
        req.body.targetVars,
        req.body.constraintVars,
        req.body.constraintVals
    ]

    const insertSql = `
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

    pool.query(insertSql, sqlParams, (error, result) => {
        if (error) {
            throw error
        }

        res.status(201).json(result.rows[0])
    })
})

//
// PUT /exercise/:exercise_id
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
        req.body.targetVars,
        req.body.constraintVars,
        req.body.constraintVals
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
// DELETE /exercise/:exercise_id
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
// Start server
//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
