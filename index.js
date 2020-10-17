const express = require('express')
const app = express() // instancia todo o express para nos.
const bodyParser = require('body-parser')
const connection = require('./database/database')
const routerA = require('./artigos/artigosRotas')
const routerB = require('./categorias/categoriasRotas')
const routerUser = require('./user/userRotas')
const Artigo = require('./artigos/Artigo')
const Categoria = require('./categorias/Categoria')
const session = require('express-session')


//config. session 
app.use(session({
    secret: 'gjdfghfghdgoirgdsfsga;s',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 9999999 }
}))

//definindo o view engine da aplicacao.
app.set('view engine', 'ejs')

// Static: onde estao os arquivos estaticos.
app.use(express.static('public'))

//Body Paser
app.use(bodyParser.urlencoded({ extended: false }))
app.set(bodyParser.json())

// autenticar a conecao com o mysql.
connection.authenticate().then(() => {
    console.log('Conexao feita com Sucesso! Mysql rodando!')
}).catch((erro) => {
    console.log('Conexao mau sucedida! ' + erro)
})

app.get('/', (req, res) => {
    Artigo.findAll({
        order: [['id', 'DESC']], limit: 4
    }).then(artigos => {
        Categoria.findAll().then(categorias => {
            res.render('index', { artigos: artigos, categorias: categorias })
        })
    })

})

app.get('/:slug', (req, res) => {

    var slug = req.params.slug
    if (slug != undefined) {

        Artigo.findOne({
            where: { slug: slug }
        }).then(artigo => {
            Categoria.findAll().then(categorias => {
                res.render('artigos', { artigo: artigo, categorias: categorias })
            })
        }).catch(() => {
            res.redirect('/')
        })
    }

})

app.get('/categoria/:slug', (req, res) => {
    var slug = req.params.slug

    if (slug != undefined) {

        Categoria.findOne({
            where: { slug: slug }, include: [{ model: Artigo }]

        }).then(categoria => {
            if (categoria != undefined) {

                Categoria.findAll().then(categorias => {
                    res.render('artigos-categoria', { artigos: categoria.artigos, categorias: categorias })
                })

            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


app.get('/admin/session', (req, res) =>{
    req.session.nome = 'Daniel Santos'
    req.session.id = 23
    res.send('sessao gerada')
})
app.get('/admin/leitura', (req, res) =>{
    res.json({
        nome: req.session.nome,
        id: req.session.id
    })
})

app.use('/', routerA)
app.use('/', routerB)
app.use('/', routerUser)



app.listen(3001, () => {
    console.log('Servidor de pé na porta 3001')
})