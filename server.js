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

    CREATE TABLE IF NOT EXISTS tasks (
        taskId SERIAL,
        userId INT REFERENCES users(userId),
        projectName varchar(36) NOT NULL,
        summary varchar(36) NOT NULL,
        description varchar(300) NOT NULL,
        difficulty varchar(36) NOT NULL,
        priority varchar(36) NOT NULL,
        endDate date NOT NULL,
        status varchar(36) NOT NULL, 
        progress INT NOT NULL,
        PRIMARY KEY (taskId)
        
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
        WHERE userId=$1;
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



function getUserByEmailAndPassword(email, password) {
    const query = `
    SELECT userId FROM task_manager.users
    WHERE email=$1 AND password=$2;
    `
    const p = new Promise((resolve, reject) => {
        db.query(query, [email, password], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result.rows)
            }
        })
    })
    return p
}

function createTask(userId, projectName, summary, description, difficulty, priority, endDate, status, progress) {
    const query = `
    INSERT INTO task_manager.tasks(userId, projectName, summary, description, difficulty, priority, endDate, status, progress) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `
    const p = new Promise((resolve, reject) => {
        db.query(query, [userId, projectName, summary, description, difficulty, priority, endDate, status, progress], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result.rows)
            }
        })
    })
    return p
}

function getAllTasksWithUserId(userId) {
    const query = `
    SELECT taskId, projectName, summary, description, difficulty, priority, endDate, status, progress 
    FROM task_manager.tasks
    WHERE userId=$1
    ORDER BY taskId DESC;
    `
    const p = new Promise((resolve, reject) => {
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result.rows)
            }
        })
    })
    return p
}

function deleteTaskByUserIdAndTaskId(userId, taskId) {
    const p = new Promise((resolve, reject) => {
        const query = `
        DELETE FROM task_manager.tasks
        WHERE userId=$1 AND taskId=$2;
        `
        db.query(query, [userId, taskId], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result.rows)
            }
        })
    })
    return p
}

app.post('/users/verify', async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await getUserByEmailAndPassword(email, password)
        if (result.length == 0) {
            res.status(400).json({ "error": "incorrect password or email does not exist" })
        } else {
            res.status(200).json(result)
        }



    } catch (err) {
        throw err
    }
})

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

app.post("/create/task", async (req, res) => {
    const { userId, projectName, summary, description, difficulty, priority, endDate, status, progress } = req.body
    try {
        const result = await createTask(userId, projectName, summary, description, difficulty, priority, endDate, status, progress)
        res.status(200).json({ "success": "successfully created task" })

    } catch (err) {
        throw err
    }

})

app.get("/get/tasks/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const result = await getAllTasksWithUserId(userId)
        res.status(200).json(result)

    } catch (err) {
        throw err
    }
})

app.delete("/delete/task/:userId/:taskId", async (req, res) => {
    const { userId, taskId } = req.params

    try {
        const result = await deleteTaskByUserIdAndTaskId(userId, taskId)
        res.status(200).json({ "success": "successfully deleted task" })
    } catch (err) {
        throw err
    }

})



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