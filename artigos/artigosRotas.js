const express = require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugify = require('slugify')

router.get('/admin/artigos', (req, res)=>{
    Artigo.findAll().then((artigos)=>{
        res.render('admin/artigos/index', { artigos: artigos})
    })
})

router.get('/admin/artigos/new', (req, res) =>{
    Categoria.findAll().then((categorias)=>{

        res.render('admin/artigos/new', { categorias: categorias})
    })    
  
})

router.post('/artigos/save', (req, res)=>{
    var titulo =req.body.titulo;
    var corpo = req.body.corpo;
    var categoia = req.body.categoia;

    Artigo.create({
        titulo: titulo,
        slug: slugify(titulo).toLowerCase(),
        corpo: corpo,
        categoiaId: categoia
    }).then(()=>{
        res.redirect('/admin/artigos')
    })


})


module.exports = router;