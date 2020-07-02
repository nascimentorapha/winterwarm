// import sqlite3 dependencie and create db
const sqlite3 = require('sqlite3').verbose()

//create object to do database operations
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {
    //Create tables
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Insert registry
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Cantarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)

    //Select registry
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os seus registros")
    //     console.log(rows)
    // } )

    //Delete registry
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")
    // })

})

