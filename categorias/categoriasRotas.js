const express = require('express')
const router = express.Router()
const Categoria = require('./Categoria')
const slugify = require('slugify')//cria slugs...
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categorias/new',adminAuth, (req, res)=>{
    res.render('admin/categorias/new')
})

router.post('/categoria/save', adminAuth, (req, res) => {
    var titulo = req.body.titulo
    if( titulo.trim() !="" ){
        
        Categoria.create({
            titulo: titulo,
            slug: slugify(titulo).toLowerCase()
        }).then(()=>{
            res.redirect('/admin/categorias')
        })
    

    }else{
        res.redirect('/admin/categorias/new')
    }
})

router.get('/admin/categorias', adminAuth, (req, res) =>{

    Categoria.findAll().then((categorias)=>{
        res.render('admin/categorias/index', {categorias: categorias})
    })
    
})

router.post('/admin/categorias/deletar', adminAuth, (req, res)=>{
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
           
            Categoria.destroy({
                where:{ id: id}
            }).then(()=>{
                res.redirect('/admin/categorias')
            })

        }else{
            res.redirect('/admin/categorias')
        }
    }else{
        res.redirect('/admin/categorias')
    }
})

router.get('/admin/categorias/editar/:id', adminAuth, (req, res)=>{
    var id = req.params.id
    if(id != undefined){
        if(!isNaN(id)){ 
            // esta funcao é mais rapida que findOne({where:{id: id}})
            //Ela encontra o id direto.. por isso é mais rapida
            Categoria.findByPk(id).then((categorias)=>{
                res.render('admin/categorias/editar', {categorias: categorias})
            })

        }else{
            res.redirect('/admin/categorias')
        }

    }else{
        res.redirect('/admin/categorias')
    }
})

router.post('/categorias/update', adminAuth, (req, res)=>{
    var id = req.body.id
    var titulo = req.body.titulo
    if(id != undefined && titulo != undefined){
        if(!isNaN(id)){ 
            // esta funcao é mais rapida que findOne({where:{id: id}})
            //Ela encontra o id direto.. por isso é mais rapida
            Categoria.update(
                {
                    titulo: titulo,
                    slug: slugify(titulo).toLowerCase()

                }, { where: {id:id} }).then(()=>{
                res.redirect('/admin/categorias')
            })

        }else{
            res.redirect('/admin/categorias')
        }

    }else{
        res.redirect('/admin/categorias')
    }
})



module.exports = router;