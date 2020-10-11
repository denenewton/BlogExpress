const express = require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugify = require('slugify')

router.get('/admin/artigos', (req, res)=>{
    Artigo.findAll({
        include: [{model: Categoria}]
    }).then((artigos)=>{
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
    var categoria = req.body.categoria;

    Artigo.create({
        titulo: titulo,
        slug: slugify(titulo).toLowerCase(),
        corpo: corpo,
        categoriaId: categoria
    }).then(()=>{
        res.redirect('/admin/artigos')
    })


})

router.get('/artigos/delete/:id',(req, res)=>{
    var id = req.params.id
    if(!isNaN(id)){

        Artigo.destroy({

            where: { id: id}

        }).then(()=>{

            console.log('Artigo deletado com sucesso.')
            res.redirect('/admin/artigos')
        })

    }else{
        res.redirect('/admin/artigos')
    }
   
})


module.exports = router;