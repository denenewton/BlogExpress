const express = require('express')
const app = express() // instancia todo o express para nos.
const bodyParser = require('body-parser')
const connection = require('./database/database')
const routerA = require('./artigos/artigosRotas')
const routerB = require('./categorias/categoriasRotas')
const Artigo = require('./artigos/Artigo')
const Categoria = require('./categorias/Categoria')

//definindo o view engine da aplicacao.
app.set('view engine', 'ejs')

// Static: onde estao os arquivos estaticos.
app.use(express.static('public'))

//Body Paser
app.use(bodyParser.urlencoded({extended: false}))
app.set(bodyParser.json())

// autenticar a conecao com o mysql.
connection.authenticate().then(()=>{
    console.log('Conexao feita com Sucesso! Mysql rodando!')
}).catch((erro)=>{
    console.log('Conexao mau sucedida! '+ erro)
})

app.get('/', (req, res)=>{
    res.render('index')
})
app.use('/', routerA)
app.use('/', routerB)

app.listen(3001, ()=>{
    console.log('Servidor de pé na porta 3001')
})