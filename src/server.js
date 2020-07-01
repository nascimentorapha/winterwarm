const express = require("express")
const server = express()

//get database
const db = require("./database/db.js")

//public folder
server.use(express.static("public"))

//Enable req.body function
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { //express use the Template Engine
    express: server,            // and path to render
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")
})
// 
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body = req.query send on POST form
    console.log(req.body)
    
    //insert data on db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
                    //last parameter: callback = function to run 
    db.run(query, values, afterInsertData) //after insert registry

})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "" ){
        return res.render("search-results.html", { total: 0 })
    }

    //get data from db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

       const total = rows.length

        return res.render("search-results.html", { places: rows, total })
    })


})


server.listen(3000)