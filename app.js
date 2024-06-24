const express = require('express');
const bodyparser = require('body-parser');
const Mysql = require('mysql');
const app = express();


const port = process.env.port || 3001


app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());

//Mysql

const pool = Mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "user",
    connectionLimit:10
})

//Get All User
app.get('/', (req, res) =>{
    
    pool.getConnection((err, result) =>{
        if(err) throw err

        console.log(`Connected as id ${result.threadId}`)

        result.query('SELECT * FROM tbuser', (err,rows) =>{
            result.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})

//Get user by ID

app.get('/:id', (req, res) =>{
    1
    pool.getConnection((err, result) =>{
        if(err) throw err

        console.log(`Connected as id ${result.threadId}`)

        result.query('SELECT * FROM tbuser where id = ?', [req.params.id], (err,rows) =>{
            result.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})

//Delete User By ID

app.delete('/:id', (req, res) =>{
    
    pool.getConnection((err, result) =>{
        if(err) throw err

        console.log(`Connected as id ${result.threadId}`)

        result.query('DELETE FROM tbuser where id = ?', [req.params.id], (err,rows) =>{
            result.release()

            if(!err){
                res.send(`User ID : ${[req.params.id]} have been Removed.`)
            }else{
                console.log(err)
            }
        })
    })
})

//Add User 

app.post('', (req, res) =>{
    
    pool.getConnection((err, result) =>{
        if(err) throw err
        console.log(`Connected as id ${result.threadId}`)

        const params = req.body

        result.query('insert into tbuser set ?', params, (err,rows) =>{
            result.release()

            if(!err){
                res.send(`User ID : ${params.ID} have been Removed.`)
            }else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})


//Update

app.put('', (req, res) =>{
    
    pool.getConnection((err, result) =>{
        if(err) throw err
        console.log(`Connected as id ${result.threadId}`)

        const { ID , Username, Email, Password} = req.body

        result.query('update tbuser set username = ? where ID =  ?', [Username,ID], (err,rows) =>{
            result.release()

            if(!err){
                res.send(`UserID : ${ID} have been Updated.`)
            }else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));