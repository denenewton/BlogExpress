function adminAuth(req, res, next){

    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('/admin/user/login')
    }
}

module.exports = adminAuth;