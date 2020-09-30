const express = require('express')
const router = express.Router()
const Categoria = require('./Categoria')
const slugify = require('slugify')

router.get('/admin/categorias/new', (req, res)=>{
    res.render('admin/categorias/new')
})

router.post('/categoria/save', (req, res) => {
    var titulo = req.body.titulo
    if( titulo.trim() !="" ){
        
        Categoria.create({
            titulo: titulo,
            slug: slugify(titulo).toLowerCase()
        }).then(()=>{
            res.redirect('/')
        })
    

    }else{
        res.redirect('/admin/categorias/new')
    }
})

router.get('/admin/categorias/', (req, res) =>{

    Categoria.findAll().then((categorias)=>{
        res.render('admin/categorias/index', {categorias: categorias})
    })
    
})


module.exports = router;