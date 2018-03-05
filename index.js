const express = require("express")
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser")
const dbPath = path.join(__dirname, 'database.json')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    console.log("Get Root")
    response.end()
})

// CREATE
app.post("/wise", (request, response) => {
    fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const database = JSON.parse(data)
            database.datas.push(JSON.stringify(request.body))
            fs.writeFile(dbPath, JSON.stringify(database), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            response.end();
        } else {
            console.log(err);
        }
    })
})

// READ
app.get("/wise", (request, response) => {
    fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const database = JSON.parse(data)
            console.log(database.datas[request.query.idx]);
            response.end();
        } else {
            console.log(err);
        }
    })
})

// UPDATE
app.patch("/wise", (request, response) => {
    fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const database = JSON.parse(data)
            if (database.datas[request.query.idx]) {
                database.datas[request.query.idx] = JSON.stringify(request.body)
                fs.writeFile(dbPath, JSON.stringify(database), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            } else {
                response.send("Not update");
            }
            response.end();
        } else {
            console.log(err);
        }
    })
})

// DELETE
app.delete("/wise", (request, response) => {
    fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const database = JSON.parse(data)
            database.datas[request.query.idx] = {}
            console.log("database", database)
            // fs.writeFile(dbPath, JSON.stringify(database), (err) => {
            //     if (err) throw err;
            //     console.log('The file has been saved!');
            // });
            response.end();
        } else {
            console.log(err);
        }
    })
})

app.listen(3000, () => {
    console.log("시작됨")
})