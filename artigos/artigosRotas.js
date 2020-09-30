const express = require('express')
const router = express.Router()

router.get('/artigos', (req, res)=>{
    res.send('Rota de Artigos...')
})


module.exports = router;