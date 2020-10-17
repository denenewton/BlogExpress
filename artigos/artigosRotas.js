const express = require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/artigos',adminAuth, (req, res)=>{
    Artigo.findAll({
        include: [{model: Categoria}]
    }).then((artigos)=>{
        res.render('admin/artigos/index', { artigos: artigos})
    })
})

router.get('/admin/artigos/new', adminAuth, (req, res) =>{
    Categoria.findAll().then((categorias)=>{

        res.render('admin/artigos/new', { categorias: categorias})
    })    
  
})

router.post('/artigos/save',adminAuth, (req, res)=>{
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

router.get('/artigos/delete/:id', adminAuth, (req, res)=>{
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

router.get('/admin/artigos/editar/:id', adminAuth ,(req, res)=>{
      var id = req.params.id
      Artigo.findByPk(id).then(artigo =>{
        if( artigo != undefined){
         
         Categoria.findAll().then(categorias =>{

         res.render('admin/artigos/editar', {artigo: artigo, categorias:categorias})
         })     
        }else{
          res.redirect('/')  
        }
      }).catch( erro =>{
          console.log('erro ao editar: '+ erro)
          res.redirect('/')
      })      
})
router.post('/artigos/update',adminAuth ,(req, res) =>{ 
    var { id, titulo, corpo, categoria} = req.body
   
     Artigo.update({
         titulo: titulo,
         corpo: corpo,
         slug: slugify(titulo).toLowerCase(),
         categoriaId: categoria

     },{ 
         where: { id: id}
     }).then(()=>{
         res.redirect('/admin/artigos')
     })

} )
router.get('/artigos/page/:num',(req, res)=>{
    var page = req.params.num;
    var offset = 0 ;

    if(isNaN(page) || page==1){
        offset = 0;
    }else{
        offset = (parseInt(page)*4) -4;//retorna a quantidade a partir de endiante
    }

    Artigo.findAndCountAll({ //retorna todos os artigos mais a quantidade deles..
        order: [["id", 'desc']],
        limit:4,
        offset: offset

    }).then(artigos => {

        var next;
        if(offset + 4 >= artigos.count){// count quantidade de artigos
            next = false
        }else{ next = true}

        var result = {
            page: parseInt(page),
            next: next,
            artigos: artigos
        }
         Categoria.findAll().then(categorias=>{
            res.render('admin/artigos/page', { result: result, categorias: categorias})
         })
        
    })
} )


module.exports = router;