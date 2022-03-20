const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
app.use(bodyParser.json());
require("dotenv").config();
const cors = require('cors');
app.use(cors());




// create connection
let db;
if (process.env.LOCAL_SERVER != undefined) {
    db = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
    });

    db.query(`
    SET search_path TO task_manager;

    CREATE TABLE IF NOT EXISTS users (
        userId SERIAL,
        first_name varchar(36) NOT NULL,
        last_name varchar(36) NOT NULL,
        email varchar(36) NOT NULL UNIQUE,
        password varchar(36) NOT NULL,
        primary key(userId) 
    );

    `)
    console.log("reached")

} else {

    db = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        ssl: {
            rejectUnauthorized: false,
        }
    });




}

function getUser(email) {

    const p = new Promise((resolve, reject) => {
        const query =
            `
        SELECT userId FROM task_manager.users
        WHERE email=$1
        `
        db.query(query, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows)

            }
        })

    })
    return p

}

function getUserByUserId(userId) {

    const p = new Promise((resolve, reject) => {
        const query =
            `
        SELECT * FROM task_manager.users
        WHERE userId=$1
        `
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows)

            }
        })

    })
    return p

}

app.get('/users/check/:userId', async (req, res) => {

    try {
        const { userId } = req.params;
        const result = await getUserByUserId(userId)
        if (result.length == 0) {

            res.status(404).json({ "error": "id was not found in the database" })
        } else {
            res.status(200).json(result)
        }
    } catch (err) {
        throw err
    }

})


app.get('/users/:email', async (req, res) => {

    try {
        const { email } = req.params;
        console.log(email)
        const result = await getUser(email)
        if (result.length == 0) {

            res.status(404).json({ "error": "email was not found in the database" })
        } else {
            res.status(200).json(result)
        }
    } catch (err) {
        throw err
    }

})

app.post("/users/registration", async (req, res) => {
    const { firstName, lastName, email, password } = req.body



    try {
        const ifExists = await getUser(email)
        if (ifExists.length == 1) {
            res.status(400).json({ "error": "Sorry, a user already registered with that email" })
            return
        }
        const query =
            `INSERT INTO task_manager.users(first_name, last_name, email, password) VALUES
        ($1, $2, $3, $4)
        `
        await db.query(query, [firstName, lastName, email, password])
        const id = await getUser(email)
        res.status(200).json(id)

    } catch (err) {
        throw err
    }



})
/*
app.post("/users/registration", (req, res) => {

    let query = "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)";
    db.query(query, [req.body.username, req.body.password, req.body.role], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('post table created...');
    });


});
*/



/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/signup", "/home"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(__dirname + "/client/build/index.html");
});







/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});