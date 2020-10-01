const express = require('express')
const router = express.Router()
const Categoria = require('./Categoria')
const slugify = require('slugify')//cria slugs...

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
            res.redirect('/admin/categorias')
        })
    

    }else{
        res.redirect('/admin/categorias/new')
    }
})

router.get('/admin/categorias', (req, res) =>{

    Categoria.findAll().then((categorias)=>{
        res.render('admin/categorias/index', {categorias: categorias})
    })
    
})

router.post('/admin/categorias/deletar', (req, res)=>{
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

router.get('/admin/categorias/editar/:id', (req, res)=>{
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

router.post('/categorias/update', (req, res)=>{
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