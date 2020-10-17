const express = require("express")
const Sequelize = require('sequelize')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
const adminAuth = require('../middlewares/adminAuth')



router.get('/admin/user', adminAuth, (req, res) => {
    User.findAll().then( users => {
       res.render('admin/user/index', { users: users})
    })
})

router.get('/admin/user/create', (req, res) => {
    res.render('admin/user/create')
})

router.post('/users/create', (req, res) => {
    var email = req.body.email
    var senha = req.body.senha
    //verifica se o email já existe no sistema..
    User.findOne({ where: { email: email } }).then(user => {

        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10) // um complemento para ficar mais seguro o hash
            var hash = bcrypt.hashSync(senha, salt)//cria um hash para senha

            User.create({
                email: email,
                senha: hash
            }).then(() => {
                res.redirect('/')
            }).catch((erro) => {
                res.redirect('/')
            })
        } else {
           
           res.redirect('/admin/user/create')
        }
    })
})
// rota que renderiza a pagina de login..
router.get('/admin/user/login', (req, res)=>{
    res.render('admin/user/login')
})

//rota para autenticar o usuario ao logar no site..
router.post('/admin/user/autenticate', (req, res)=>{
    var email = req.body.email
    var senha = req.body.senha

    User.findOne({ 
       where: {email: email}
    }).then( user =>{

        if(user != undefined){
            //validar senha.. compara a senha dig com a do banco que esta em hash
            var correct = bcrypt.compareSync(senha, user.senha)
            if(correct){
            //se a senha tiver correta abrimos uma sessao de usuario
             req.session.user = {
                 id: user.id,
                 email: user.email
             }
             res.redirect('/admin/artigos')

            }else{
                res.redirect('/admin/user/login')
            }

        }else{
            res.redirect('/admin/user/login')
        }
    })
})

router.get('/admin/user/logout',(req, res )=>{
    req.session.user = undefined;
    res.redirect('/')
})




module.exports = router;

